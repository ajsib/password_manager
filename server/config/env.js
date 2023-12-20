// Import the dotenv library to load environment variables from .env file
const dotenv = require('dotenv');

// Load environment variables from .env file into the process.env object
dotenv.config();

// Export an object containing environment variables for use in other parts of the application
module.exports = {
  // Export the value of the SQL database host
  SQLPASSWORD: process.env.SQLPASSWORD,

  // Export the JWT secret key
  JWT_SECRET: process.env.JWT_SECRET
};