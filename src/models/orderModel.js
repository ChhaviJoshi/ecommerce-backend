const pool = require("../config/db");

const createOrder = async (userId) => {
  const client = await pool.connect(); 

  try {
    await client.query("BEGIN"); 

    // Get Cart Items
    const cartQuery = `
      SELECT c.product_id, c.quantity, p.price 
      FROM cart_items c
      JOIN products p ON c.product_id = p.id
      WHERE c.user_id = $1
    `;
    const cartRes = await client.query(cartQuery, [userId]);
    const cartItems = cartRes.rows;

    if (cartItems.length === 0) {
      throw new Error("Cart is empty");
    }

    // Total Price
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += parseFloat(item.price) * item.quantity;
    });

    // Create Order Record
    const orderQuery = `
      INSERT INTO orders (user_id, total_price, status)
      VALUES ($1, $2, 'pending')
      RETURNING id, created_at
    `;
    const orderRes = await client.query(orderQuery, [userId, totalPrice]);
    const orderId = orderRes.rows[0].id;

    // Move Items to Order Items Table
    for (const item of cartItems) {
      const itemQuery = `
        INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase)
        VALUES ($1, $2, $3, $4)
      `;
      await client.query(itemQuery, [
        orderId,
        item.product_id,
        item.quantity,
        item.price,
      ]);
    }

    // Clear User's Cart
    await client.query("DELETE FROM cart_items WHERE user_id = $1", [userId]);

    await client.query("COMMIT"); 
    return { orderId, totalPrice, status: "pending" };
  } catch (error) {
    await client.query("ROLLBACK"); 
    throw error;
  } finally {
    client.release(); 
  }
};

const getOrdersByUserId = async (userId) => {
  const query =
    "SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC";
  const result = await pool.query(query, [userId]);
  return result.rows;
};

module.exports = { createOrder, getOrdersByUserId };
