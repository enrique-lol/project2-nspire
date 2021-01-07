#!/bin/bash
# TOKEN='fa7ebbb2bcb1b5a0344e70a6380e3414' OLDPW='123' NEWPW='321' sh curl-scripts/auth/change-password.sh
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
