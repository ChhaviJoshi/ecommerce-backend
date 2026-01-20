const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Route: POST /api/auth/register
router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;

const authenticateToken = require("../middleware/authMiddleware");

// Route: GET /api/auth/profile (Protected)
router.get("/profile", authenticateToken, (req, res) => {
  res.json({
    message: "This is a protected route",
    user: req.user,
  });
});
