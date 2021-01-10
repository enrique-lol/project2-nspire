#!/bin/bash
# EMAIL="review@email" PASSWORD="example_password" sh curl-scripts/auth/sign-up.sh
# Fully version 1 operational as of 01/06.

API="https://limitless-forest-94283.herokuapp.com"
URL_PATH="/sign-up"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "'"${EMAIL}"'",
      "password": "'"${PASSWORD}"'",
      "password_confirmation": "'"${PASSWORD}"'"
    }
  }'

echo
