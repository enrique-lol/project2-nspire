#!/bin/bash
# EMAIL='example_email' PASSWORD='exapmle_password' sh curl-scripts/auth/sign-in.sh
# Fully version 1 operational as of 01/06.


API="http://localhost:4741"
URL_PATH="/sign-in"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "'"${EMAIL}"'",
      "password": "'"${PASSWORD}"'"
    }
  }'

echo
