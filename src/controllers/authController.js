const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); 
require("dotenv").config();
const userModel = require("../models/userModel");

// 1. REGISTER (You already have this)
const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.createUser(name, email, hashedPassword);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// 2. LOGIN (👈 NEW FUNCTION)
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // A. Check if user exists
    const user = await userModel.findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // B. Check Password (Compare plain text vs. hash)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // C. Generate Token (The "Key Card")
    // Payload: What information is hidden inside the token?
    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    // Sign the token with your secret key
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    // D. Send Token
    res.json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { register, login };
