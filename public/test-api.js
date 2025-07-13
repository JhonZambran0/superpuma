// Script de prueba para verificar la API
const testAPI = async () => {
  try {
    console.log('Probando inicialización de usuarios...');
    
    // Inicializar usuarios
    const initResponse = await fetch('/api/init-users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    const initResult = await initResponse.json();
    console.log('Resultado de inicialización:', initResult);
    
    // Probar login
    console.log('Probando login...');
    const loginResponse = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        correo: 'admin@hotmail.com',
        contraseña: 'Pa$word1992'
      })
    });
    
    const loginResult = await loginResponse.json();
    console.log('Resultado de login:', loginResult);
    
    if (loginResult.success) {
      console.log('✅ Login exitoso!');
    } else {
      console.log('❌ Login falló:', loginResult.message);
    }
    
  } catch (error) {
    console.error('Error en la prueba:', error);
  }
};

// Ejecutar cuando se cargue la página
if (typeof window !== 'undefined') {
  window.testAPI = testAPI;
  console.log('Función testAPI() disponible. Ejecuta testAPI() en la consola para probar.');
}
