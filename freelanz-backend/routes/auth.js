const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // Add JWT
const User = require("../models/User");

const JWT_SECRET = "your-secret-key"; // Replace with a secure key (store in .env)

// Signup route
router.post("/signup", async (req, res) => {
  const { fullName, email, password, role } = req.body;

  try {
    const normalizedEmail = email.trim().toLowerCase();
    console.log("Signup attempt with:", { fullName, email: normalizedEmail, password, role });

    let user = await User.findOne({ email: normalizedEmail });
    if (user) {
      console.log("Email already exists:", normalizedEmail);
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password.trim(), 10);
    user = new User({
      fullName: fullName.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: role || "client",
    });

    await user.save();
    console.log("User created successfully:", { id: user._id, email: normalizedEmail });
    res.json({ message: "User created successfully", id: user._id });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const normalizedEmail = email.trim().toLowerCase();
    console.log("Login attempt with:", { email: normalizedEmail, password });

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      console.log("User not found for email:", normalizedEmail);
      return res.status(400).json({ message: "User not found" });
    }
    console.log("User found:", { id: user._id, email: user.email });

    const isMatch = await bcrypt.compare(password.trim(), user.password);
    if (!isMatch) {
      console.log("Password mismatch for user:", normalizedEmail);
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    console.log("Login successful for user:", normalizedEmail);
    res.json({
      message: "Login successful",
      id: user._id,
      name: user.fullName,
      token, // Include token in response
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;