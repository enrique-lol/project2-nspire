#!/bin/bash
# TOKEN='d433091e2669414eaf22ebb3c6e1d467' sh curl-scripts/auth/sign-out.sh
# Fully version 1 operational as of 01/06.

API="http://localhost:4741"
URL_PATH="/sign-out"

curl "${API}${URL_PATH}/" \
  --include \
  --request DELETE \
  --header "Authorization: Bearer ${TOKEN}"

echo
