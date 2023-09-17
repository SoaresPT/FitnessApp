const User = require('../models/userModel');
const bcrypt = require('bcrypt');

// Function to register a new user
async function signup(req, res) {
  try {
    const { email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document
    const newUser = new User({ email, password: hashedPassword });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Function to get all registered users
async function getAllUsers(req, res) {
  try {
    // Fetch all users from the database
    const users = await User.find();

    // Send the list of users as JSON response
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  signup,
  getAllUsers,
};
