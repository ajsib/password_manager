// controllers/userController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Import the User model
const { JWT_SECRET } = require('../config/env'); // Import JWT secret key

// register function
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Use User model to check if the email already exists
    const existingUser = await User.findByEmail(email);

    if (existingUser) {
      return res.status(409).send('Email already in use');
    }

    // Use User model to create a new user
    await User.create(email, password, name);
    res.status(201).send('User created');
  } catch (error) {
    res.status(500).send('Error registering user');
  }
};

// login function
exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Use User model to find user by email
      const user = await User.findByEmail(email);
  
      // THIS IS TEMPORARY - REMOVE THIS IN PRODUCTION
      const device_fingerprint = "SOME_DEVICE_ID"; // TODO: Get this from the client
  
      if (user && await bcrypt.compare(password, user.password)) {
        // Create JWT token
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
        const tokenExpiration = new Date(new Date().getTime() + (60 * 60 * 1000)); // 1 hour from now 
  
        // Insert session into database using User model method
        await User.createSession(user.id, token, tokenExpiration, device_fingerprint);
  
        res.status(200).json({ token });
      } else {
        res.status(401).send('Invalid credentials');
      }
    } catch (error) {
      res.status(500).send("Error logging in");
    }
  };
  

// logout function
exports.logout = async (req, res) => {
  try {
    const token = req.body.token;
    const db = require('../config/db'); // Ensure db is imported for raw query
    const deleteQuery = 'DELETE FROM sessions WHERE token = ?';
    await db.promise().query(deleteQuery, [token]);
    res.status(200).send('Logged out successfully');
  } catch (error) {
    res.status(500).send('Error logging out');
  }
};

// authenticate user function with password, returns true or false if user password entered correct
// no email just password. user identified by token