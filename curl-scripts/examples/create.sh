#!/bin/bash
# TOKEN='4e700561c4386478a94396388a63baf5' TEXT='LOL 2: The SECOND Review Text' TITLE='LOL 2: The SECOND Review Title' sh curl-scripts/reviews/create.sh
# Fully version 1 operational as of 01/07.

API="http://localhost:4741"
URL_PATH="/reviews"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "review": {
      "text": "'"${TEXT}"'",
      "title": "'"${TITLE}"'"
    }
  }'

echo
