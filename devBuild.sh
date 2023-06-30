#!/bin/bash

#build and up the development environment
#docker compose -f docker-compose.yml -f docker-compose.override.yml up --build

#up the development envioronment without building
docker compose -f docker-compose.yml -f docker-compose.override.yml up

