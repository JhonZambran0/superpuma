import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Configuración de Firebase usando variables de entorno
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyBVE1_FgOYqG7JQRkZ2rFpXMR6WfqNqUlo",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "solicitudes-70af0.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "solicitudes-70af0",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "solicitudes-70af0.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "513108134731",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:513108134731:web:3aabdd8a5d4dcc54aab6ce",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-BYE06JTMPH"
};

// Validar que las variables de entorno estén configuradas en producción
if (process.env.NODE_ENV === 'production') {
  const requiredEnvVars = [
    'NEXT_PUBLIC_FIREBASE_API_KEY',
    'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN', 
    'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
    'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET'
  ];
  
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      console.warn(`Warning: ${envVar} is not set in production environment`);
    }
  }
}

// Inicializar Firebase
const firebaseApp = initializeApp(firebaseConfig);
// Obtiene el servicio de almacenamiento
const storage = getStorage(firebaseApp);

export { firebaseApp, storage };

