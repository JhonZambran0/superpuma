import { ResponseData } from "../../models";

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

const HttpClient = async (path: string, method: Method, userName: string, role: number, body?: any): Promise<ResponseData> => {
  try {
    const request: Response = await fetch(path, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        "Content-Type": "application/json",
        "userName": userName || '',
        "role": role?.toString() || '-1',
      },
    });

    // Intentar parsear la respuesta JSON incluso si hay error HTTP
    let responseData: ResponseData;
    try {
      responseData = await request.json();
    } catch (parseError) {
      responseData = {
        message: `Error HTTP ${request.status}: ${request.statusText}`,
        success: false,
      };
    }

    // Si la respuesta HTTP no es exitosa pero tenemos datos JSON válidos, devolver esos datos
    if (!request.ok) {
      return {
        ...responseData,
        success: false,
      };
    }

    return responseData;
  } catch (error) {
    // Verificar diferentes tipos de errores
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return {
        message: "No se pudo conectar con el servidor. Verifica tu conexión a internet.",
        success: false,
      };
    }

    return {
      message: "Error de conexión con el servidor",
      success: false,
    };
  }
};

export default HttpClient;
