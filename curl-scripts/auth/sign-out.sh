#!/bin/bash
# TOKEN='example_token' sh curl-scripts/auth/sign-out.sh
# Fully version 1 operational as of 01/06.

API="http://localhost:4741"
URL_PATH="/sign-out"

curl "${API}${URL_PATH}/" \
  --include \
  --request DELETE \
  --header "Authorization: Bearer ${TOKEN}"

echo
