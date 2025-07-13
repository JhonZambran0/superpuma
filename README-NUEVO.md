# Sistema de Herramientas del Helicóptero Super Puma

Sistema web para la gestión y control de herramientas del helicóptero Super Puma desarrollado con Next.js, TypeScript y MongoDB.

## 🚁 Características Principales

- **Gestión de Herramientas**: Control completo del inventario de herramientas
- **Sistema de Calibración**: Seguimiento de calibraciones y mantenimientos
- **Gestión de Bodegas**: Control de ubicaciones y almacenamiento
- **Sistema de Solicitudes**: Manejo de préstamos y devoluciones
- **Reportes**: Generación de reportes en PDF y Excel
- **Gestión de Usuarios**: Sistema de roles (Admin, Bodeguero, Cliente)

## 🛠️ Tecnologías Utilizadas

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, Bootstrap, Material-UI
- **Base de Datos**: MongoDB con Mongoose
- **Autenticación**: Sistema personalizado con cookies
- **Reportes**: jsPDF, React-CSV, Excel Export
- **Componentes**: AG-Grid, DevExtreme, React Hook Form

## 📋 Requisitos Previos

- Node.js (versión 16 o superior)
- MongoDB (local o Atlas)
- Git

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone https://github.com/JhonZambran0/superpuma.git
cd superpuma
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crear un archivo `.env.local` basado en `.env.example`:

```bash
# Base de datos MongoDB
MONGODB_URI=mongodb://localhost:27017/cemae_db

# Configuración para NextJS
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=tu_clave_secreta_aqui

# Configuración de ambiente
NODE_ENV=development
```

### 4. Iniciar el servidor de desarrollo
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 👤 Usuarios de Prueba

### Administrador
- **Correo**: admin@hotmail.com
- **Contraseña**: Pa$word1992

### Usuario Marco
- **Correo**: marco92antonio@outlook.com
- **Contraseña**: admin

## 👨‍💻 Autor

**JhonZambran0**
- Email: jjzambrano25@utpl.edu.ec
- GitHub: [@JhonZambran0](https://github.com/JhonZambran0)

---

**Sistema de Herramientas del Helicóptero Super Puma** - Desarrollado con ❤️ para la gestión eficiente de herramientas aeronáuticas.
