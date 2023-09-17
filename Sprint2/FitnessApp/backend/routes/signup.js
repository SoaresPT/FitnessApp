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

module.exports = router;
