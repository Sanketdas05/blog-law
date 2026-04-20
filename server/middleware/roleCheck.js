/**
 * Role-Based Access Control Middleware
 * Factory function that returns middleware checking if user has required role.
 * Must be used AFTER the auth middleware.
 *
 * Usage: roleCheck('author')
 */
const roleCheck = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required.' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: 'Access denied. You do not have permission to perform this action.',
      });
    }

    next();
  };
};

export default roleCheck;
