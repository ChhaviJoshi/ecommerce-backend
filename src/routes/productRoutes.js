const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authenticateToken = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");

router.get("/", productController.getProducts);

router.post(
  "/",
  authenticateToken,
  authorizeRole("admin"),
  productController.addProduct,
);
router.put(
  "/:id",
  authenticateToken,
  authorizeRole("admin"),
  productController.updateProduct,
);
router.delete(
  "/:id",
  authenticateToken,
  authorizeRole("admin"),
  productController.deleteProduct,
);

module.exports = router;
