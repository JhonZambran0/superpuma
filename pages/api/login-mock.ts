import { NextApiRequest, NextApiResponse } from "next";

// Usuarios en memoria para pruebas
const mockUsers = [
  {
    _id: "507f1f77bcf86cd799439011",
    id: "507f1f77bcf86cd799439011",
    number: 1,
    usuario: "admin",
    contraseña: "Pa$word1992",
    nombre: "Administrador",
    correo: "admin@hotmail.com",
    identificacion: "12345678",
    telefono: "555-0001",
    rol: 0,
    estado: "activo",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "507f1f77bcf86cd799439012",
    id: "507f1f77bcf86cd799439012",
    number: 2,
    usuario: "marco92",
    contraseña: "admin",
    nombre: "Marco Antonio",
    correo: "marco92antonio@outlook.com",
    identificacion: "87654321",
    telefono: "555-0002",
    rol: 1,
    estado: "activo",
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Configurar headers CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Método no permitido. Solo se permite POST.",
      success: false,
    });
  }

  try {
    const { correo, contraseña } = req.body;
    
    if (!correo || !contraseña) {
      return res.status(400).json({
        message: "Correo y contraseña son requeridos",
        success: false,
      });
    }

    // Buscar usuario en los datos mock
    const user = mockUsers.find(u => u.correo === correo && u.contraseña === contraseña);
    
    if (user) {
      const userResponse = {
        _id: user._id,
        id: user.id,
        number: user.number,
        usuario: user.usuario,
        nombre: user.nombre,
        correo: user.correo,
        identificacion: user.identificacion,
        telefono: user.telefono,
        rol: user.rol,
        estado: user.estado,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      };

      return res.status(200).json({
        message: "¡Bienvenido!",
        data: userResponse,
        success: true,
      });
    }

    return res.status(401).json({
      message: "Credenciales incorrectas",
      success: false,
    });

  } catch (error) {
    console.error("Error en login:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
      success: false,
    });
  }
}
