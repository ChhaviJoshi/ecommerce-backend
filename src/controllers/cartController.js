const cartModel = require("../models/cartModel");

// POST /api/cart (Add to Cart)
const addToCart = async (req, res) => {
  // We get the User ID from the Token (req.user)
  const userId = req.user.id;
  const { productId, quantity } = req.body;

  console.log("🛒 Add to Cart Request Received!");
  console.log("User ID from Token:", userId);
  console.log("Product ID:", productId);
  
  try {
    const item = await cartModel.addToCart(userId, productId, quantity || 1);
    res.status(201).json({ message: "Item added to cart", item });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// GET /api/cart (View Cart)
const getCart = async (req, res) => {
  const userId = req.user.id;
  try {
    const items = await cartModel.getCartByUserId(userId);

    // Calculate Total Price Logic
    let totalPrice = 0;
    items.forEach((item) => {
      totalPrice += parseFloat(item.price) * item.quantity;
    });

    res.json({
      cart: items,
      totalPrice: totalPrice.toFixed(2),
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// DELETE /api/cart/:productId (Remove Item)
const removeFromCart = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;

  try {
    const deleted = await cartModel.removeFromCart(userId, productId);
    if (!deleted)
      return res.status(404).json({ error: "Item not found in cart" });
    res.json({ message: "Item removed from cart" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { addToCart, getCart, removeFromCart };
