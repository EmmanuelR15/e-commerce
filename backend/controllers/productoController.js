/**
 * Controlador de productos
 * - crearProducto: guarda un nuevo producto
 * - obtenerProductos: lista todos los productos
 */

const Producto = require('../models/Producto');

// Crear producto
const crearProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio, imagen, stock, categoria } = req.body;

    // Validación mínima por seguridad (el modelo también valida)
    if (!nombre || typeof precio === 'undefined') {
      return res.status(400).json({ message: 'Nombre y precio son requeridos' });
    }

    const producto = new Producto({ nombre, descripcion, precio, imagen, stock, categoria });
    await producto.save();

    return res.status(201).json({ producto });
  } catch (err) {
    console.error('Error crearProducto:', err);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Obtener todos los productos
const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find().sort({ createdAt: -1 }).lean();
    return res.json({ productos });
  } catch (err) {
    console.error('Error obtenerProductos:', err);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = {
  crearProducto,
  obtenerProductos,
};
