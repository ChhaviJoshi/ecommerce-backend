const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authenticateToken = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");

// Public Route (Anyone can see products)
router.get("/", productController.getProducts);

// Protected Admin Routes (Only Admins can add/edit/delete)
// Notice the double security check: 1. Are you logged in? 2. Are you an Admin?
router.post(
  "/",
  authenticateToken,
  authorizeRole("admin"),
  productController.addProduct
);
router.put(
  "/:id",
  authenticateToken,
  authorizeRole("admin"),
  productController.updateProduct
);
router.delete(
  "/:id",
  authenticateToken,
  authorizeRole("admin"),
  productController.deleteProduct
);

module.exports = router;
