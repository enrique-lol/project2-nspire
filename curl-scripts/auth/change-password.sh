#!/bin/bash
# TOKEN='example_token' OLDPW='old_pw_example' NEWPW='new_pw_example' sh curl-scripts/auth/change-password.sh
# Fully version 1 operational as of 01/06.

API="http://localhost:4741"
URL_PATH="/change-password"

curl "${API}${URL_PATH}/" \
  --include \
  --request PATCH \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
    "passwords": {
      "old": "'"${OLDPW}"'",
      "new": "'"${NEWPW}"'"
    }
  }'

echo
