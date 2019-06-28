#!/usr/bin/env bash

# This script removes the built containers and associated volume for the mysql service.
docker-compose down
docker-compose rm
docker volume rm "colrc-v2_mysql"
