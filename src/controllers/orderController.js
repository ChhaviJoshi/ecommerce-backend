const orderModel = require("../models/orderModel");
const pool = require("../config/db"); // ✅ Needed to fetch user email
const axios = require("axios"); // ✅ Needed to call microservice

// POST /api/orders (Checkout)
const placeOrder = async (req, res) => {
  const userId = req.user.id;
  try {
    // 1. Create the Order in DB
    const order = await orderModel.createOrder(userId);

    // 2. MICROSERVICE TRIGGER: Send Notification
    // First, fetch the user's email (since our token only has the ID)
    const userRes = await pool.query("SELECT email FROM users WHERE id = $1", [
      userId,
    ]);
    const userEmail = userRes.rows[0]?.email;

    if (userEmail) {
      // Call the Notification Service on Port 5001
      // We use .catch() so if the notification server is down, the order still succeeds!
      axios
        .post("http://localhost:5001/notify", {
          email: userEmail,
          orderId: order.orderId,
        })
        .catch((err) =>
          console.error("⚠️ Notification Service Error:", err.message),
        );
    }

    // ✅ Success Message is still here
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    console.error(err.message);
    // ✅ Error Handling is still here
    if (err.message === "Cart is empty") {
      return res
        .status(400)
        .json({ error: "Cannot place order. Cart is empty." });
    }
    res.status(500).json({ error: "Server error" });
  }
};

// GET /api/orders (History)
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
