const productModel = require("../models/productModel");

// GET /api/products
const getProducts = async (req, res) => {
  try {
    // Basic Pagination Logic (Page 1, Page 2...)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const products = await productModel.getAllProducts(limit, offset);
    res.json({ page, limit, products });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// POST /api/products (Admin Only)
const addProduct = async (req, res) => {
  const { name, description, price, category, stock, imageUrl } = req.body;
  try {
    const newProduct = await productModel.createProduct(
      name,
      description,
      price,
      category,
      stock,
      imageUrl
    );
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to add product" });
  }
};

// PUT /api/products/:id (Admin Only)
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, stock } = req.body;
  try {
    const updated = await productModel.updateProduct(id, name, price, stock);
    if (!updated) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product updated", product: updated });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// DELETE /api/products/:id (Admin Only)
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await productModel.deleteProduct(id);
    if (!deleted) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getProducts, addProduct, updateProduct, deleteProduct };
