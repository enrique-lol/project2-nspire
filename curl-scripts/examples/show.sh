#!/bin/sh
# ID='5ff7352c9e7bfa0dd0cef552' TOKEN='ed8345c40e5bae873b7a29c3533e5085' sh curl-scripts/examples/show.sh

API="http://localhost:4741"
URL_PATH="/examples"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo
