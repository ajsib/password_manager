# Server Structure

## Overview
This document outlines the structure of the backend server for the Password Manager application.

## Server Entry Point
- `server.js`: The main entry point of the server.

## Directories and Files
- `/middleware`: Contains middleware modules.
  - `auth.js`: Handles authentication of JWT tokens.
  - `refreshToken.js`: Manages the token refresh mechanism.
- `/models`: Contains data models.
  - `User.js`: Model for user-related database operations.
- `/controllers`: Contains business logic.
  - `userController.js`: Manages user-related operations like login and registration.
- `/routes`: Contains route definitions.
  - `userRoutes.js`: Routes for user-related endpoints.
- `/config`: Configuration files and database setup.
  - `db.js`: Sets up and exports the MySQL database connection.
  - `env.js`: Sets up environmental variables.


# Server Entry Point

The `server.js` file is the main entry point of the Express server.

## Configuration

- Sets up the Express application instance.
- Configures body-parser middleware for JSON data parsing.
- Integrates user-related routes from `userRoutes.js`.
- Defines the server's listening port (default: 3000).
- Handles graceful shutdown on receiving SIGINT (Ctrl+C).

## Usage

- Starts the server and listens for incoming requests.
- Connects to the MySQL database through `db.js`.
- Provides endpoints under `/api/users`.
