const orderModel = require("../models/orderModel");

// POST /api/orders (Checkout)
const placeOrder = async (req, res) => {
  const userId = req.user.id;
  try {
    const order = await orderModel.createOrder(userId);
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
