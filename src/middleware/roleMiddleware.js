// Check if the user has the required role (e.g., 'admin')
const authorizeRole = (requiredRole) => {
  return (req, res, next) => {
    // req.user was added by the authMiddleware previously
    if (req.user.role !== requiredRole) {
      return res
        .status(403)
        .json({ error: "Access denied. Insufficient permissions." });
    }
    next();
  };
};

module.exports = authorizeRole;
