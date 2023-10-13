const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/customMiddleware");
const User = require("../models/userModel");

// Protected API route that requires authentication
router.get("/user", authenticateToken, async (req, res) => {
  try {
    // Access user data from the request object (e.g., req.user.userId)
    const userId = req.user.userId;

    // Fetch user data from your database based on the user ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Respond with user data or any other desired response
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error in /api/user route:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
