export default function handler(req, res) {
  // Headers CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      message: 'Método no permitido',
      success: false,
    });
  }

  const { correo, contraseña } = req.body;

  // Usuarios hardcodeados
  const users = [
    {
      _id: "507f1f77bcf86cd799439011",
      correo: "admin@hotmail.com",
      contraseña: "Pa$word1992",
      nombre: "Administrador",
      rol: 0,
      estado: "activo"
    },
    {
      _id: "507f1f77bcf86cd799439012", 
      correo: "marco92antonio@outlook.com",
      contraseña: "admin",
      nombre: "Marco Antonio",
      rol: 1,
      estado: "activo"
    }
  ];

  const user = users.find(u => u.correo === correo && u.contraseña === contraseña);

  if (user) {
    return res.status(200).json({
      message: "¡Bienvenido!",
      data: user,
      success: true,
    });
  }

  return res.status(401).json({
    message: "Credenciales incorrectas",
    success: false,
  });
}
