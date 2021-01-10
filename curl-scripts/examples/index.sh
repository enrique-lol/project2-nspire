#!/bin/sh
# TOKEN='4e700561c4386478a94396388a63baf5' sh curl-scripts/reviews/index.sh

API="http://localhost:4741"
URL_PATH="/reviews"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo
