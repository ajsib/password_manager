// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userControllers');
const auth = require('../middleware/auth');
const refreshToken = require('../middleware/refreshToken'); // Import the refreshToken middleware
const router = express.Router();

// Public routes
router.post('/register', userController.register);
router.post('/login', userController.login);

// Protected routes
router.post('/logout', auth, userController.logout); // Apply auth middleware to logout route

// For example, applying it to all routes (including public ones):
router.use(refreshToken);

module.exports = router;
