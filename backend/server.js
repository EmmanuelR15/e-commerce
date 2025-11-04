// Servidor: arranca la aplicación exportada desde `app.js` y conecta a MongoDB.
// Uso de CommonJS para mantener compatibilidad con el código existente.
require('dotenv').config();
const app = require('./app');
const connectDB = require('./utils/db');

const PORT = process.env.PORT || 4000;

// Función de arranque encapsulada con manejo básico de errores.
const startServer = async () => {
  try {
    // Conectar a la base de datos antes de arrancar el servidor.
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (err) {
    // Logueo claro de errores en arranque.
    console.error('Error arrancando la aplicación:', err);
    process.exit(1); // Salir con error para que el proceso no quede en estado inconsistente.
  }
};

startServer();