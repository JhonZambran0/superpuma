import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../database/connect/mongo";
import { UserModel } from "../../database/schemas";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Solo permitir método POST
  if (req.method !== "POST") {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({
      message: "Método no permitido",
      success: false,
    });
  }

  try {
    // Conectar a la base de datos
    await dbConnect();

    // Verificar si ya existen usuarios
    const existingUsers = await UserModel.find({});
    
    if (existingUsers.length > 0) {
      return res.status(200).json({
        message: "Los usuarios ya están inicializados",
        success: true,
        data: existingUsers.map(user => ({
          id: user.id,
          usuario: user.usuario,
          nombre: user.nombre,
          correo: user.correo,
          rol: user.rol,
          estado: user.estado
        }))
      });
    }

    // Hash de las contraseñas
    const hashedPassword1 = await bcrypt.hash("Pa$word1992", 10);
    const hashedPassword2 = await bcrypt.hash("admin", 10);

    // Crear usuarios de prueba
    const usersToCreate = [
      {
        number: 1,
        usuario: "admin",
        contraseña: hashedPassword1,
        nombre: "Administrador",
        correo: "admin@hotmail.com",
        identificacion: "12345678",
        telefono: "555-0001",
        rol: 0, // Admin
        estado: "activo"
      },
      {
        number: 2,
        usuario: "marco92",
        contraseña: hashedPassword2,
        nombre: "Marco Antonio",
        correo: "marco92antonio@outlook.com",
        identificacion: "87654321",
        telefono: "555-0002",
        rol: 0, // Admin también
        estado: "activo"
      }
    ];

    // Insertar usuarios
    const createdUsers = await UserModel.insertMany(usersToCreate);

    return res.status(200).json({
      message: "Usuarios inicializados correctamente",
      success: true,
      data: createdUsers.map(user => ({
        id: user.id,
        usuario: user.usuario,
        nombre: user.nombre,
        correo: user.correo,
        rol: user.rol,
        estado: user.estado
      }))
    });

  } catch (error) {
    console.error("Error al inicializar usuarios:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
      success: false,
    });
  }
}
