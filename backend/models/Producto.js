/**
 * Modelo Producto
 * Campos: nombre, descripcion, precio, imagen, stock, categoria
 */

const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre es requerido'],
      trim: true,
    },
    descripcion: {
      type: String,
      trim: true,
    },
    precio: {
      type: Number,
      required: [true, 'El precio es requerido'],
      min: [0, 'El precio no puede ser negativo'],
    },
    imagen: {
      type: String,
      trim: true,
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, 'Stock no puede ser negativo'],
    },
    categoria: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Producto', ProductoSchema);
