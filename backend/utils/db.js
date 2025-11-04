// Módulo encargado de la conexión a MongoDB usando Mongoose.
// Exporta una función async `connectDB` que maneja la conexión.

const mongoose = require('mongoose');

// Evita comportamiento ambiguo en consultas y ayuda a mitigar ciertas inyecciones NoSQL.
mongoose.set('strictQuery', true);

/**
 * Conecta a MongoDB usando la variable de entorno MONGO_URI.
 * Lanza el error hacia el caller para que pueda decidir la acción (retry, exit, etc.).
 */
const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error('MONGO_URI no está definida en las variables de entorno');
    }

    // Conexión con opciones modernas.
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB conectado');
  } catch (err) {
    console.error('Error conectando a MongoDB:', err);
    throw err; // Re-lanzar para que el arranque pueda manejar el fallo.
  }
};

module.exports = connectDB;
