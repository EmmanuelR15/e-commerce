/**
 * Modelo Usuario
 * Campos: nombre, email, password, rol
 * - Validaciones básicas con Mongoose
 * - Hash automático de password antes de guardar (bcrypt)
 */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10; // coste razonable para un MVP

const UsuarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre es requerido'],
      trim: true,
      minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
      maxlength: [100, 'El nombre es muy largo'],
    },
    email: {
      type: String,
      required: [true, 'El email es requerido'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Email inválido'],
    },
    password: {
      type: String,
      required: [true, 'La contraseña es requerida'],
      minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
    },
    rol: {
      type: String,
      enum: ['cliente', 'admin'],
      default: 'cliente',
    },
  },
  {
    timestamps: true,
  }
);

// Hash automático antes de save si la contraseña fue modificada
UsuarioSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    return next();
  } catch (err) {
    return next(err);
  }
});

// Método para comparar contraseña (útil desde controladores)
UsuarioSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Usuario', UsuarioSchema);
