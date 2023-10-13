// In your routes file (e.g., login.js)
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { login }  = require("../controllers/userController");
const User = require("../models/userModel");

router.post("/login", login);

module.exports = router;
