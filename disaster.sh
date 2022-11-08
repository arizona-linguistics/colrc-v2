#!/bin/bash

# if pod is already running, down it and clear out any previous containers, volumes
podman play kube --down kube-deployment.yml
podman container rm --all
podman volume rm --all
sudo rm -rf ./misc/db_data
mkdir ./misc/db_data

# set up a rootless session
export DOCKER_HOST=unix://$XDG_RUNTIME_DIR/podman/podman.sock
systemctl enable --now --user podman.socket