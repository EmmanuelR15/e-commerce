// Script para probar acceso a ruta protegida POST /api/productos usando la app (supertest)
require('dotenv').config();
const connectDB = require('../utils/db');
const Usuario = require('../models/Usuario');
const request = require('supertest');
const app = require('../app');
const jwt = require('jsonwebtoken');

const main = async () => {
  try {
    await connectDB();
    const admin = await Usuario.findOne({ email: 'admin@ecommerce.com' });
    if (!admin) {
      console.error('No se encontró admin@ecommerce.com');
      process.exit(1);
    }

    const token = jwt.sign({ id: admin._id, rol: admin.rol }, process.env.JWT_SECRET || 'changeme', { expiresIn: '1h' });

    console.log('Usando token:', token);

    const res = await request(app)
      .post('/api/productos')
      .set('Authorization', `Bearer ${token}`)
      .send({ nombre: 'Producto desde script', precio: 5.5 });

    console.log('Status:', res.status);
    console.log('Body:', JSON.stringify(res.body, null, 2));

    process.exit(0);
  } catch (err) {
    console.error('Error en testAdminAccess:', err);
    process.exit(1);
  }
};

main();
