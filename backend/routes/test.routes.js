// Ruta temporal para verificación del backend.
// Devuelve un JSON sencillo en GET /api/test

const express = require('express');
const router = express.Router();

// GET /api/test -> { ok: true, message: 'Backend activo' }
router.get('/', (req, res) => {
  res.json({ ok: true, message: 'Backend activo' });
});

module.exports = router;
