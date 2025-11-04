/**
 * Middleware para verificar JWT en Authorization: Bearer <token>
 */

const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    // Adjuntar información relevante del token al request
    req.user = decoded;
    return next();
  } catch (err) {
    console.error('verifyToken error:', err);
    return res.status(401).json({ message: 'Token inválido' });
  }
};

module.exports = { verifyToken };
