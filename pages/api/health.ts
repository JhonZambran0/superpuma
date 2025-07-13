import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../database/connect/mongo";
import { UserModel } from "../../database/schemas";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({
      message: "Método no permitido",
      success: false,
    });
  }

  try {
    // Conectar a la base de datos
    await dbConnect();

    // Verificar cuántos usuarios existen
    const userCount = await UserModel.countDocuments();
    
    // Obtener algunos usuarios de ejemplo (sin contraseñas)
    const sampleUsers = await UserModel.find({}, { contraseña: 0 }).limit(5);

    return res.status(200).json({
      message: "API funcionando correctamente",
      success: true,
      data: {
        totalUsers: userCount,
        sampleUsers: sampleUsers,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error("Error en health check:", error);
    return res.status(500).json({
      message: "Error de conexión a la base de datos",
      success: false,
      error: error.message
    });
  }
}
