const pool = require("../config/db");

// 1. Add Item to Cart (Upsert Logic)
const addToCart = async (userId, productId, quantity) => {
  // First, check if the item is already in the cart for this user
  const checkQuery =
    "SELECT * FROM cart_items WHERE user_id = $1 AND product_id = $2";
  const checkResult = await pool.query(checkQuery, [userId, productId]);

  if (checkResult.rows.length > 0) {
    // Item exists? Update quantity
    const updateQuery = `
      UPDATE cart_items 
      SET quantity = quantity + $1 
      WHERE user_id = $2 AND product_id = $3 
      RETURNING *`;
    const result = await pool.query(updateQuery, [quantity, userId, productId]);
    return result.rows[0];
  } else {
    // Item doesn't exist? Insert new row
    const insertQuery = `
      INSERT INTO cart_items (user_id, product_id, quantity)
      VALUES ($1, $2, $3)
      RETURNING *`;
    const result = await pool.query(insertQuery, [userId, productId, quantity]);
    return result.rows[0];
  }
};

// 2. Get Cart Items (With Product Details)
const getCartByUserId = async (userId) => {
  const query = `
    SELECT ci.id, ci.quantity, p.name, p.price, p.image_url, p.id as product_id
    FROM cart_items ci
    JOIN products p ON ci.product_id = p.id
    WHERE ci.user_id = $1
  `;
  const result = await pool.query(query, [userId]);
  return result.rows;
};

// 3. Remove Item from Cart
const removeFromCart = async (userId, productId) => {
  const query =
    "DELETE FROM cart_items WHERE user_id = $1 AND product_id = $2 RETURNING *";
  const result = await pool.query(query, [userId, productId]);
  return result.rows[0];
};

module.exports = { addToCart, getCartByUserId, removeFromCart };
