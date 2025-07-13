import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../database/connect/mongo";
import { UserModel } from "../../database/schemas";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({
      message: "Método no permitido",
      success: false,
    });
  }

  try {
    await dbConnect();

    const { usuario, correo, contraseña } = req.body;

    // Aceptar tanto 'usuario' como 'correo' del frontend
    const userIdentifier = usuario || correo;

    if (!userIdentifier || !contraseña) {
      return res.status(400).json({
        message: "Usuario/correo y contraseña son requeridos",
        success: false,
      });
    }

    // Buscar usuario por nombre de usuario o correo electrónico
    const user = await UserModel.findOne({ 
      $or: [
        { usuario: userIdentifier },
        { correo: userIdentifier }
      ]
    });

    if (!user) {
      return res.status(401).json({
        message: "Credenciales inválidas",
        success: false,
      });
    }

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(contraseña, user.contraseña);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Credenciales inválidas",
        success: false,
      });
    }

    // Usuario autenticado exitosamente
    const userData = {
      id: user._id,
      usuario: user.usuario,
      nombre: user.nombre,
      correo: user.correo,
      identificacion: user.identificacion,
      telefono: user.telefono,
      rol: user.rol,
      estado: user.estado
    };

    return res.status(200).json({
      message: "Login exitoso",
      data: userData,
      success: true,
    });

  } catch (error) {
    console.error("Error en login:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
      success: false,
    });
  }
}