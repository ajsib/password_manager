// config/db.js
const mysql = require('mysql2');
const { SQLPASSWORD } = require('./env');

console.log('SQLPASSWORD', SQLPASSWORD);

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'passMangr',
  password: SQLPASSWORD,
  database: 'passMangr',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

connection.on('error', (err) => {
  console.error('MySQL error:', err); 
});

module.exports = connection; 
