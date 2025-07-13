import { NextApiRequest, NextApiResponse } from "next";

// Usuarios estáticos para producción (sin dependencias de MongoDB)
const STATIC_USERS = [
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Configurar headers CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

  // Manejar preflight OPTIONS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({
      message: `Método ${req.method} no permitido. Solo se permite POST.`,
      success: false,
    });
  }

  try {
    const { correo, contraseña } = req.body;
    
    // Validación básica
    if (!correo || !contraseña) {
      return res.status(400).json({
        message: "Correo y contraseña son requeridos",
        success: false,
      });
    }

    // Buscar usuario
    const user = STATIC_USERS.find(u => u.correo === correo && u.contraseña === contraseña);
    
    if (user) {
      // Usuario encontrado
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

    // Credenciales incorrectas
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
