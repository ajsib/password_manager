// utils/sanitize.js

// Sanitize and validate string input
function sanitize_strings(input) {
    if (typeof input !== 'string') {
      throw new Error('Input must be a string');
    }
  
    // Perform additional sanitization or validation here if needed
  
    return input;
  }
  
  // Sanitize and validate numerical input
  function sanitize_nums(input) {
    if (typeof input !== 'number') {
      throw new Error('Input must be a number');
    }
  
    // Perform additional sanitization or validation here if needed
  
    return input;
  }
  
  module.exports = {
    sanitize_strings,
    sanitize_nums,
  };
  