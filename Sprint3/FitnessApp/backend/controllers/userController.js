const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//token gen
const createToken = (id) => {
  return jwt.sign({ _id: id }, process.env.JWT_SECRET, { expiresIn: '3h' })
}

// Function to register a new user
async function signup(req, res) {
  try {
    const { email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document
    const newUser = new User({ email, password: hashedPassword });

    const token = createToken(newUser._id);

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ newUser, token, message: 'User registered successfully' });
    console.log(newUser);
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

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Both email and password are required." });
    }

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
    //const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    // Generate a token with user ID and email - this is the payload - Testing to see if this works for the dashboard frontend
    // const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET);
    const token = createToken(user._id);

    // Send the token and a success message to the front-end
    res.status(200).json({ message: "Login successful", token });
    console.log("Login successful");
  } catch (error) {
    console.error("Error in login route:", error);
    res.status(500).json({ error: "Internal server error" });
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
  createToken,
  signup,
  login,
  getAllUsers,
  deleteUserByEmail,
  updateUserByEmail,
};