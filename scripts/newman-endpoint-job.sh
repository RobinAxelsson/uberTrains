#!/usr/bin/env bash

### This script is needed for running newman integration test in BackendPipeline.yml

# Values are inserted from GitHub secrets as import arguments in the CI pipeline.

COLLECTION_UID=$1
POSTMAN_APIKEY=$2

npm install -g newman
cd ./backend || exit

# Build and start the backend server as a backgroundprocess
npm run start:dev &
sleep 20

# Backend Api endpoint tests
newman run "https://api.getpostman.com/collections/$COLLECTION_UID?apikey=$POSTMAN_APIKEY"
