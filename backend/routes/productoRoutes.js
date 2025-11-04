/**
 * Rutas de productos
 * GET /api/productos -> listar
 * POST /api/productos -> crear (sin protección por ahora)
 */

const express = require('express');
const router = express.Router();

const productoController = require('../controllers/productoController');
const { verifyToken } = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/authorizeRoles');

router.get('/', productoController.obtenerProductos);
// POST protegido: sólo usuarios autenticados con rol 'admin'
router.post('/', verifyToken, authorizeRoles('admin'), productoController.crearProducto);

module.exports = router;
