const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

// Import Database Connection
const pool = require("./src/config/db");

const app = express();
const authRoutes = require("./src/routes/authRoutes");

// Middleware (Security & Logging)
app.use(express.json()); // Allow JSON body parsing
app.use(cors()); // Allow frontend requests
app.use(helmet()); // Security headers
app.use(morgan("dev")); // Request logging
app.use("/api/auth", authRoutes);

// Basic Route to Test Server
app.get("/", (req, res) => {
  res.send("🚀 E-Commerce API is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on port ${PORT}`);
});
