#!/bin/bash

# if pod is already running, down it and clear out any previous containers, volumes
# podman play kube --down kube-deployment.yml
# podman container rm --all
# podman volume rm --all

# COMPOSE_DOCKER_CLI_BUILD=0 DOCKER_BUILDKIT=0 docker-compose build
DOCKER_BUILDKIT=0 docker-compose -f docker-compose-prod.yml build

# copy built images to rootless account
# sudo podman image scp root@localhost::colrc-v2-backend:latest amyfou@localhost::
# sudo podman image scp root@localhost::colrc-v2-nginx:latest amyfou@localhost::
# sudo podman image scp root@localhost::colrc-v2-file_upload:latest amyfou@localhost::

# set up the persistent volumes and pvcs
#  podman play kube kube-volumes.yml
#  sleep 3
# bring up persistent volumes and pvcs, start postgres and run the colrc.sql script, then bring it all down 
 podman play kube kube-deployment-psql.yml
 sleep 10
 PGPASSWORD=11chastq psql -h localhost -p 5432 -d postgres -U postgres -f ./misc/sql/colrc.sql
 sleep 10
# chown -R $USER:$USER ./misc/db_data
# sleep 3
 podman play kube --down kube-deployment-psql.yml
 sleep 10
# bring up backend, postgres and hasura in a single pod
 podman play kube kube-deployment.yml 
