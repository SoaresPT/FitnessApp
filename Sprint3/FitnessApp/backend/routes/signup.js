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
  

module.exports = router;
