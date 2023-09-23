// In your routes file (e.g., login.js)
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email in your database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials. Please try again." });
    }

    // Check if the provided password matches the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials. Please try again." });
    }

    // Generate a token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    // Send the token and a success message to the front-end
    res.status(200).json({ message: "Login successful", token });
    console.log("Login successful");
  } catch (error) {
    console.error("Error in login route:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
