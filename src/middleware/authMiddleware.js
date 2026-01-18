const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
  // 1. Get the token from the header
  const authHeader = req.headers["authorization"];
  // Format is usually "Bearer TOKEN_STRING", so we split it
  const token = authHeader && authHeader.split(" ")[1];

  // 2. If no token, kick them out
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  // 3. Verify the token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Attach user info to the request object
    next(); // Pass control to the next function (the controller)
  } catch (err) {
    res.status(403).json({ error: "Invalid token." });
  }
};

module.exports = authenticateToken;
