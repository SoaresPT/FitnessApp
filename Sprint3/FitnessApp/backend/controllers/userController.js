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

    // Check if the error is a MongoDB duplicate key error (error code 11000)
    if (error.code === 11000) {
      // Respond with a custom error message for duplicate email
      res.status(400).json({ error: 'Signup failed. This user already has an account.' });
    } else {
      // Handle any other errors and respond with a generic error message
      res.status(500).json({ error: 'Internal server error' });
    }
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

// Function to delete a user by email
async function deleteUserByEmail(emailToDelete, req, res) {
  try {
    // Find and delete the user by email from your database
    await User.findOneAndDelete({ email: emailToDelete });

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Function to update a user by email
async function updateUserByEmail(emailToUpdate, updatedUserData, req, res) {
  try {
    // Update the user by email in your database
    await User.findOneAndUpdate({ email: emailToUpdate }, updatedUserData);

    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  signup,
  getAllUsers,
  deleteUserByEmail,
  updateUserByEmail,
};