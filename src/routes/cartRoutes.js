const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const authenticateToken = require("../middleware/authMiddleware");

// All Cart routes require a User Token
router.post("/", authenticateToken, cartController.addToCart);
router.get("/", authenticateToken, cartController.getCart);
router.delete("/:productId", authenticateToken, cartController.removeFromCart);

module.exports = router;
