// server.js
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const connection = require('./config/db'); // Import the connection from db.js
const passwordRoutes = require('./routes/passwordRoutes');

// Create an instance of the Express application
const app = express();

// Configure Express to parse JSON data in requests
app.use(bodyParser.json()); 

// Use the userRoutes for handling API requests with '/api/users' as the base URL
app.use('/api/users', userRoutes);
app.use('/api/passwords', passwordRoutes);

// Define the port number where the server will listen for incoming requests
// If the PORT environment variable is not defined, the server will use port 3000 as a default.
const port = process.env.PORT || 3000;

// Start the server and listen on the specified port
const server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Listen for SIGINT (Ctrl+C) to trigger the "exit" event
process.on('SIGINT', () => {
  console.log('Received SIGINT. Exiting...');
  connection.end((err) => {
    if (err) {
      console.error('Error closing MySQL connection:', err);
    } else {
      console.log('MySQL connection closed');
    }
    process.exit();
  });
});
