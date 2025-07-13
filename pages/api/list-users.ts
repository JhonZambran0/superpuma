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
      message: "Método no permitido - usa GET",
      success: false,
    });
  }

  try {
    // Conectar a la base de datos
    await dbConnect();

    // Obtener todos los usuarios (sin contraseñas)
    const users = await UserModel.find({}, { contraseña: 0 });

    return res.status(200).json({
      message: "Usuarios encontrados",
      success: true,
      count: users.length,
      data: users
    });

  } catch (error) {
    console.error("Error al listar usuarios:", error);
    return res.status(500).json({
      message: "Error interno del servidor: " + error.message,
      success: false,
    });
  }
}
