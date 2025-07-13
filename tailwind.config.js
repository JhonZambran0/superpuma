/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./controllers/**/*.{js,ts,jsx,tsx,mdx}",
    "./layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // Configuración para producción
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./controllers/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    options: {
      safelist: [
        // Agregar clases que no deben ser purgadas
        'bg-red-500',
        'bg-green-500',
        'bg-blue-500',
        'text-white',
        'hover:bg-red-600',
        'hover:bg-green-600',
        'hover:bg-blue-600',
      ],
    },
  },
}
