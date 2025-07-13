import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../database/connect/mongo";
import { UserModel } from "../../database/schemas";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Debug: Log del método y datos recibidos
  console.log("=== LOGIN DEBUG ===");
  console.log("Method:", req.method);
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);

  if (req.method !== "POST") {
    console.log("❌ Método incorrecto:", req.method);
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({
      message: `Método no permitido: ${req.method}. Use POST`,
      success: false,
      debug: {
        receivedMethod: req.method,
        expectedMethod: "POST"
      }
    });
  }

  try {
    // Verificar conexión MongoDB
    await dbConnect();
    console.log("✅ Conexión MongoDB exitosa");

    const { usuario, correo, contraseña } = req.body;
    console.log("Datos recibidos:", { usuario, correo, contraseña: "***" });

    // Aceptar tanto 'usuario' como 'correo' del frontend
    const userIdentifier = usuario || correo;

    if (!userIdentifier || !contraseña) {
      console.log("❌ Faltan datos:", { userIdentifier: !!userIdentifier, contraseña: !!contraseña });
      return res.status(400).json({
        message: "Usuario/correo y contraseña son requeridos",
        success: false,
        debug: {
          hasUserIdentifier: !!userIdentifier,
          hasPassword: !!contraseña
        }
      });
    }

    // Buscar usuario por nombre de usuario o correo electrónico
    const user = await UserModel.findOne({ 
      $or: [
        { usuario: userIdentifier },
        { correo: userIdentifier }
      ]
    });

    console.log("Usuario encontrado:", !!user);

    if (!user) {
      return res.status(401).json({
        message: "Credenciales inválidas",
        success: false,
        debug: {
          searchedFor: userIdentifier,
          userFound: false
        }
      });
    }

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(contraseña, user.contraseña);
    console.log("Contraseña válida:", isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Credenciales inválidas",
        success: false,
        debug: {
          userFound: true,
          passwordValid: false
        }
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

    console.log("✅ Login exitoso para:", user.usuario);

    return res.status(200).json({
      message: "Login exitoso",
      data: userData,
      success: true,
    });

  } catch (error) {
    console.error("❌ Error en login:", error);
    return res.status(500).json({
      message: "Error interno del servidor: " + error.message,
      success: false,
      debug: {
        error: error.message
      }
    });
  }
}
