#! /bin/bash

if [ -x "$(command -v docker)" ]; then
    echo "Docker test passed"
else
    echo "Docker is missing from this machine or you do not have the rights to access it"
    exit 1
fi

if [ -x "$(command -v docker-compose)" ]; then
    echo "Docker-compose test passed"
else
    echo "Docker-compose is missing from this machine or you don't have the rights to access it"
    exit 1
fi

echo "Environment checks finished"