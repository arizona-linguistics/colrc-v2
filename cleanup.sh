#!/usr/bin/env bash

# This script removes the built containers and associated volume for the postgres service.
docker-compose down
docker-compose rm
docker volume rm "colrc-v2_db_data"
# remove old images to avoid surpises with any changed dependencies
docker rmi "colrc-v2_backend"
#rm -rf backend/node_modules
docker rmi "colrc-v2_frontend"
