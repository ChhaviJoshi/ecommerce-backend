const orderModel = require("../models/orderModel");
const pool = require("../config/db"); 
const axios = require("axios"); 

// POST /api/orders 
const placeOrder = async (req, res) => {
  const userId = req.user.id;
  try {
    const order = await orderModel.createOrder(userId);

    // 2. Microservise trigger
    const userRes = await pool.query("SELECT email FROM users WHERE id = $1", [
      userId,
    ]);
    const userEmail = userRes.rows[0]?.email;

    if (userEmail) {
       axios
        .post("http://localhost:5001/notify", {
          email: userEmail,
          orderId: order.orderId,
        })
        .catch((err) =>
          console.error("⚠️ Notification Service Error:", err.message),
        );
    }

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    console.error(err.message);
    
    if (err.message === "Cart is empty") {
      return res
        .status(400)
        .json({ error: "Cannot place order. Cart is empty." });
    }
    res.status(500).json({ error: "Server error" });
  }
};

// GET /api/orders 
const getOrders = async (req, res) => {
  const userId = req.user.id;
  try {
    const orders = await orderModel.getOrdersByUserId(userId);
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { placeOrder, getOrders };
