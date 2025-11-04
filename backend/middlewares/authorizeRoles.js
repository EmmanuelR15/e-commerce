/**
 * Middleware para autorizar por roles
 * Uso: authorizeRoles('admin', 'moderator')
 */

module.exports = function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    try {
      if (!req.user || !req.user.rol) {
        return res.status(401).json({ message: 'Token no proporcionado o inválido' });
      }

      const userRole = req.user.rol;
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ message: 'Acceso denegado' });
      }

      return next();
    } catch (err) {
      console.error('authorizeRoles error:', err);
      return res.status(500).json({ message: 'Error en autorización' });
    }
  };
};
