import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Aceptar cualquier método para testing
  try {
    return res.status(200).json({
      message: "✅ API funcionando correctamente",
      success: true,
      method: req.method,
      timestamp: new Date().toISOString(),
      headers: req.headers,
      body: req.body
    });

  } catch (error) {
    return res.status(500).json({
      message: "❌ Error en API test: " + error.message,
      success: false,
    });
  }
}
