import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../database/connect/mongo";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({
      message: "Método no permitido - usa GET",
      success: false,
    });
  }

  try {
    // Verificar variable de entorno
    const mongoUri = process.env.MONGODB_URI;
    
    if (!mongoUri) {
      return res.status(500).json({
        message: "❌ MONGODB_URI no está configurada",
        success: false,
        env: {
          NODE_ENV: process.env.NODE_ENV,
          hasMongoUri: !!mongoUri
        }
      });
    }

    // Intentar conectar
    await dbConnect();

    return res.status(200).json({
      message: "✅ Conexión a MongoDB exitosa",
      success: true,
      env: {
        NODE_ENV: process.env.NODE_ENV,
        hasMongoUri: !!mongoUri,
        mongoUriPreview: mongoUri.substring(0, 20) + "..."
      }
    });

  } catch (error) {
    console.error("Error en debug:", error);
    return res.status(500).json({
      message: "❌ Error de conexión: " + error.message,
      success: false,
      error: error.message
    });
  }
}
