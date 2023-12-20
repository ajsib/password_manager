#!/bin/bash

# Host
HOST="http://localhost:3000"

# User credentials
EMAIL="newuser@example.com"
PASSWORD="newpassword"
NAME="New User"

# Register a new user
echo "-------- Registering a new user --------"
REGISTER_RESPONSE=$(curl -s -X POST "$HOST/api/users/register" \
  -H "Content-Type: application/json" \
  -d "{\"email\": \"$EMAIL\", \"password\": \"$PASSWORD\", \"name\": \"$NAME\"}")
echo "Register response: $REGISTER_RESPONSE"

# Log in the user
echo "-------- Logging in the user --------"
LOGIN_RESPONSE=$(curl -s -X POST "$HOST/api/users/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\": \"$EMAIL\", \"password\": \"$PASSWORD\"}")
TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.token')
echo "Login response: $LOGIN_RESPONSE"
echo "Token: $TOKEN"

# # Add a password
# echo "-------- Adding a password --------"
# ADD_PASSWORD_RESPONSE=$(curl -s -X POST "$HOST/api/passwords" \
#   -H "Content-Type: application/json" \
#   -H "Authorization: Bearer $TOKEN" \
#   -d "{\"password_name\": \"example.com\", \"encryptedPassword\": \"EncryptedPassword123\", \"notes\": \"Some notes here\"}")
# echo "Add password response: $ADD_PASSWORD_RESPONSE"

# List passwords
# echo "-------- Listing passwords --------"
# PASSWORDS_LIST_RESPONSE=$(curl -s -X GET "$HOST/api/passwords" \
#   -H "Authorization: Bearer $TOKEN")
# echo "Passwords list response: $PASSWORDS_LIST_RESPONSE"

# # Share a password (Assuming we know the passwordId and the shareWithUserId)
# PASSWORD_ID="1"
# SHARE_WITH_USER_ID="15"
# echo "-------- Sharing a password --------"
# SHARE_PASSWORD_RESPONSE=$(curl -s -X POST "$HOST/api/passwords/$PASSWORD_ID/share" \
#   -H "Content-Type: application/json" \
#   -H "Authorization: Bearer $TOKEN" \
#   -d "{\"passwordId\": \"$PASSWORD_ID\", \"shareWithUserId\": \"$SHARE_WITH_USER_ID\"}")
# echo "Share password response: $SHARE_PASSWORD_RESPONSE"

# # List shared passwords
# echo "-------- Listing shared passwords --------"
# SHARED_PASSWORDS_RESPONSE=$(curl -s -X GET "$HOST/api/passwords/shared" \
#   -H "Authorization: Bearer $TOKEN")
# echo "Shared passwords response: $SHARED_PASSWORDS_RESPONSE"

# Log out the user
echo "-------- Logging out   the user --------"
LOGOUT_RESPONSE=$(curl -s -X POST "$HOST/api/users/logout" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d "{\"token\": \"$TOKEN\"}")
echo "Logout response: $LOGOUT_RESPONSE"
