# Database Schema

## Overview
This document details the schema of the MySQL database used in the Password Manager application.

## Tables

### Users
- `id`: Primary Key, Integer
- `username`: String
- `email`: String
- `password`: String (Hashed)
- `name`: String
- `created_at`: DateTime
- `updated_at`: DateTime

### Sessions
- `id`: Primary Key, Integer
- `user_id`: Foreign Key, Integer (References Users)
- `device_fingerprint`: String
- `token`: String (JWT)
- `last_activity`: DateTime
- `token_expiration`: DateTime

### Passwords
- `id`: Primary Key, Integer
- `user_id`: Foreign Key, Integer (References Users)
- `website`: String
- `username`: String
- `encrypted_password`: String (Double Hashed)
- `notes`: Text (Optional)
- `created_at`: DateTime
- `updated_at`: DateTime

# Database Configuration

The `db.js` file in the `config` directory sets up the MySQL database connection for the application.

## Overview

- Establishes a connection to the MySQL database.
- Uses environment variables for sensitive information like the database password.
- Handles database connection errors.
- Logs the status of the database connection.

