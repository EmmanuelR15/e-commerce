// Script para crear un usuario admin directamente en la BD usando Mongoose
// Uso: node backend/scripts/createAdmin.js

require('dotenv').config();
const connectDB = require('../utils/db');
const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');

const main = async () => {
  try {
    await connectDB();

    const email = 'admin@ecommerce.com';
    const existing = await Usuario.findOne({ email });
    if (existing) {
      console.log('El usuario admin ya existe:', existing.email, 'id=', existing._id.toString());
      const token = jwt.sign({ id: existing._id, rol: existing.rol }, process.env.JWT_SECRET || 'changeme', { expiresIn: '1h' });
      console.log('JWT (existing):', token);
      process.exit(0);
    }

    const admin = new Usuario({ nombre: 'Admin', email, password: 'admin123', rol: 'admin' });
    await admin.save();
    console.log('Admin creado:', admin.email, 'id=', admin._id.toString());

    const token = jwt.sign({ id: admin._id, rol: admin.rol }, process.env.JWT_SECRET || 'changeme', { expiresIn: '1h' });
    console.log('JWT (new):', token);

    process.exit(0);
  } catch (err) {
    console.error('Error creando admin:', err);
    process.exit(1);
  }
};

main();
