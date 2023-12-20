# Authentication Flow

## Overview
This document describes the authentication flow implemented in the Password Manager backend server.

## Process
1. **User Registration**: Users can register with a username, email, and password.
2. **User Login**: On successful login, a JWT token is issued.
3. **Session Management**: Sessions are managed with JWT tokens stored in the `sessions` table.
4. **Token Management**: Tokens are managed with a token refresh mechanism.
    - *Token Expiration:* Each session token has a designated expiration time, specified in the token_expiration field in the sessions table. This expiration time determines how long the token is valid for.
    - *Checking Token Expiration:* To determine if a token needs to be refreshed, the application checks if the current time is close to or past the token_expiration time. If the current time is within a certain time frame (e.g., 5 minutes) of the token_expiration, it indicates that the token is close to expiring.
    - *Checking Last Activity:* While the token is close to expiring, the application also checks the last_activity timestamp. This timestamp records the time of the user's last interaction with the app.
    - *Token Refresh Condition:* If both of the following conditions are met:
        - The current time is within the predefined time frame (e.g., 5 minutes) of the token_expiration.
        - The last_activity timestamp is within the last 5 minutes (or within a similar time frame) from the current time, then the token is refreshed.
    - *Refreshing the Token:* When the token is refreshed, the application makes a secure API request to the server to obtain a new token. This request may include the current token for validation purposes.
    - *Server Validation:* The server validates the existing token to ensure its authenticity. If the token is valid, the server issues a new token with an updated expiration time.
    - *Updating Token and Expiration:* The application replaces the old token with the new one in the session persistence mechanism on the user's device (e.g., local storage). It also updates the token and token_expiration fields in the sessions table in the database.
    - *Continued Session:* With the new token in place, the user can continue their session without any interruption. They are not required to sign in again.
1. **Logout**: On logout, the token is invalidated, and the session is removed from the database.
