// Configuración principal de la aplicación Express.
// Aquí se registran middlewares y se exporta `app` para que `server.js` lo utilice.

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

// Seguridad HTTP headers
app.use(helmet());

// Logger de peticiones (dev). Se puede ajustar o reemplazar en producción.
app.use(morgan('dev'));

// Parseo JSON
app.use(express.json());

// CORS restricto: solo el front de desarrollo indicado.
const allowedOrigins = ['http://localhost:5173'];
app.use(
  cors({
    origin: function (origin, callback) {
      // Permitir solicitudes sin origen (ej. herramientas de testing o same-origin)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `La política CORS no permite accesos desde ${origin}`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

// Ruta temporal para verificación rápida del backend.
// Se monta en /api/test y devuelve un JSON mínimo. Fácil de remover.
const testRouter = require('./routes/test.routes');
app.use('/api/test', testRouter);

// Rutas de autenticación
app.use('/api/auth', require('./routes/auth.routes'));

// Rutas de productos
app.use('/api/productos', require('./routes/productoRoutes'));

// Exportar la instancia de express para usar en server.js y en tests.
module.exports = app;

// Nota: las rutas se montan de forma modular. Las rutas de negocio y modelos
// se añadirán en archivos separados bajo `routes/` y `controllers/`.
