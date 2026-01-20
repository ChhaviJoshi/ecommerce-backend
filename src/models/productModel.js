const pool = require("../config/db");

// 1. Create Product (Admin Only)
const createProduct = async (
  name,
  description,
  price,
  category,
  stock,
  imageUrl
) => {
  const query = `
    INSERT INTO products (name, description, price, category, stock, image_url)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
  const values = [name, description, price, category, stock, imageUrl];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// 2. Get All Products (With Search & Filter)
const getAllProducts = async (limit = 10, offset = 0, search, category, minPrice, maxPrice) => {
  let query = 'SELECT * FROM products WHERE 1=1';
  const values = [];
  let paramIndex = 1;

  // Dynamic SQL Construction
  if (search) {
    query += ` AND name ILIKE $${paramIndex}`;
    values.push(`%${search}%`); // % allows partial matching
    paramIndex++;
  }
  if (category) {
    query += ` AND category = $${paramIndex}`;
    values.push(category);
    paramIndex++;
  }
  if (minPrice) {
    query += ` AND price >= $${paramIndex}`;
    values.push(minPrice);
    paramIndex++;
  }
  if (maxPrice) {
    query += ` AND price <= $${paramIndex}`;
    values.push(maxPrice);
    paramIndex++;
  }

  // Add Pagination
  query += ` ORDER BY created_at DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
  values.push(limit, offset);

  const result = await pool.query(query, values);
  return result.rows;
};

// 3. Get Single Product (Public)
const getProductById = async (id) => {
  const query = "SELECT * FROM products WHERE id = $1";
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

// 4. Update Product (Admin Only)
const updateProduct = async (id, name, price, stock) => {
  const query = `
    UPDATE products 
    SET name = $1, price = $2, stock = $3 
    WHERE id = $4 
    RETURNING *;
  `;
  const result = await pool.query(query, [name, price, stock, id]);
  return result.rows[0];
};

// 5. Delete Product (Admin Only)
const deleteProduct = async (id) => {
  const query = "DELETE FROM products WHERE id = $1 RETURNING *";
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
