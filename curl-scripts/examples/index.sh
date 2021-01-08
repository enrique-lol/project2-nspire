#!/bin/sh
# TOKEN='4e700561c4386478a94396388a63baf5' sh curl-scripts/examples/index.sh

API="http://localhost:4741"
URL_PATH="/examples"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo
