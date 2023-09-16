// In your routes file (e.g., signup.js)
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define a route for user registration
router.post('/signup', userController.signup);

module.exports = router;
