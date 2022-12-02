#!/bin/bash

# if database changes, then dump the db

cp ./misc/sql/colrc.sql ./misc/sql/colrc_old.sql

pg_dump -Cc -U postgres -h localhost --password colrc > ./misc/sql/colrc.sql

sleep 10

#replace stuff at the top of the file
sed -i "s/DROP DATABASE colrc/DROP DATABASE IF EXISTS colrc/" ./misc/sql/colrc.sql

#doublecheck output of dump on new server to be sure we look for the correct pattern
sed -i "s/ENCODING = 'UTF8' LOCALE = 'en_US.utf8'/LC_COLLATE \= 'en\_US\.utf8' LC_CTYPE \= 'en\_US\.utf8'/" ./misc/sql/colrc.sql

# if pod is already running, down it and clear out any previous containers, volumes
podman play kube --down kube-deployment.yml
podman container rm --all
podman volume rm --all
sudo rm -rf ./misc/db_data
mkdir ./misc/db_data

# set up a rootless session
export DOCKER_HOST=unix://$XDG_RUNTIME_DIR/podman/podman.sock
systemctl enable --now --user podman.socket
