const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// 👇 THIS IS THE PART THAT PRINTS THE MESSAGE
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("❌ Database Connection Failed:", err.message);
  } else {
    console.log("✅ Connected to PostgreSQL successfully!");
  }
});

module.exports = pool;
