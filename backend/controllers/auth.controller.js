/**
 * Controladores de autenticación
 * - registerUsuario: crea usuario y devuelve JWT
 * - loginUsuario: valida credenciales y devuelve JWT
 */

const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '1h';

if (!JWT_SECRET) {
  // No se lanza en import para no romper tests, pero se registrará si falta en tiempo de ejecución
  console.warn('JWT_SECRET no está definida en las variables de entorno');
}

// Genera token JWT con payload mínimo
const generateToken = (user) => {
  const payload = { id: user._id, rol: user.rol };
  return jwt.sign(payload, JWT_SECRET || 'changeme', { expiresIn: JWT_EXPIRES_IN });
};

const registerUsuario = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nombre, email, password } = req.body;

    // Verificar existencia previa
    const existing = await Usuario.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Email ya registrado' });
    }

    const usuario = new Usuario({ nombre, email, password });
    await usuario.save();

    const token = generateToken(usuario);

    // No devolver password
    const userSafe = { id: usuario._id, nombre: usuario.nombre, email: usuario.email, rol: usuario.rol };

    return res.status(201).json({ token, user: userSafe });
  } catch (err) {
    console.error('Error en registerUsuario:', err);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const loginUsuario = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const isMatch = await usuario.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = generateToken(usuario);
    const userSafe = { id: usuario._id, nombre: usuario.nombre, email: usuario.email, rol: usuario.rol };

    return res.json({ token, user: userSafe });
  } catch (err) {
    console.error('Error en loginUsuario:', err);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = {
  registerUsuario,
  loginUsuario,
};
