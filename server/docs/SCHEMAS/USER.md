# User Controller

The `userController.js` file in the `controllers` directory handles all the user-related operations.

## Functions

### register(req, res)
- Description: Registers a new user.
- Inputs: `username`, `email`, `password`.
- Outputs: Confirmation message or error.

### login(req, res)
- Description: Authenticates a user and creates a session.
- Inputs: `username`, `password`.
- Outputs: JWT token or error.

### logout(req, res)
- Description: Logs out a user by ending their session.
- Inputs: `token`.
- Outputs: Confirmation message or error.
