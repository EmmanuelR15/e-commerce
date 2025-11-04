/**
 * Rutas de autenticación
 * POST /api/auth/register
 * POST /api/auth/login
 * Validaciones con express-validator
 */

const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { verifyToken } = require('../middlewares/authMiddleware');

// POST /api/auth/register
router.post(
  '/register',
  [
    body('nombre').isString().isLength({ min: 2 }).withMessage('Nombre inválido'),
    body('email').isEmail().withMessage('Email inválido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  ],
  authController.registerUsuario
);

// POST /api/auth/login
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Email inválido'),
    body('password').exists().withMessage('La contraseña es requerida'),
  ],
  authController.loginUsuario
);

// GET /api/auth/me -> ruta protegida temporal que devuelve información del token
router.get('/me', verifyToken, (req, res) => {
  // req.user fue adjuntado por verifyToken (contiene id y rol)
  return res.json({ ok: true, user: req.user });
});

module.exports = router;

