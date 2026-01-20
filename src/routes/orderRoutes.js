const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authenticateToken = require("../middleware/authMiddleware");

// Protect all order routes
router.post("/", authenticateToken, orderController.placeOrder);
router.get("/", authenticateToken, orderController.getOrders);

module.exports = router;
