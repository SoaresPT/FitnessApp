// In your routes file (e.g., signup.js)
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define a route for user registration
router.post('/signup', async (req, res) => {
  try {
    console.log('Received signup request');
    await userController.signup(req, res);
  } catch (error) {
    console.error('Error in signup route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Define a route to get all registered users (GET)
// http://localhost:3001/api/users
router.get('/users', async (req, res) => {
    try {
      // Call the getAllUsers function in your userController to fetch all users
      await userController.getAllUsers(req, res);
    } catch (error) {
      console.error('Error in user retrieval route:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
// Delete a user by email (DELETE)
// http://localhost:3001/api/users/:email
router.delete('/users/:email', async (req, res) => {
  try {
    const emailToDelete = req.params.email;
    
    // Call a function in your userController to delete the user by email
    await userController.deleteUserByEmail(emailToDelete, req, res);
  } catch (error) {
    console.error('Error in user deletion route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user information by email (PUT)
// http://localhost:3001/api/users/:email
router.put('/users/:email', async (req, res) => {
  try {
    const emailToUpdate = req.params.email;
    const updatedUserData = req.body; // Include the updated user data in the request body
    
    // Call a function in your userController to update the user by email
    await userController.updateUserByEmail(emailToUpdate, updatedUserData, req, res);
  } catch (error) {
    console.error('Error in user update route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
