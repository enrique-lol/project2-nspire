#!/bin/bash
# TOKEN='4e700561c4386478a94396388a63baf5' TEXT='LOL 2: The SECOND Example Text' TITLE='LOL 2: The SECOND Example Title' sh curl-scripts/examples/create.sh
# Fully version 1 operational as of 01/07.

API="http://localhost:4741"
URL_PATH="/examples"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "example": {
      "text": "'"${TEXT}"'",
      "title": "'"${TITLE}"'"
    }
  }'

echo
