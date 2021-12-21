#!/usr/bin/env bash

COLLECTION_UID=$1
POSTMAN_APIKEY=$2

npm install -g newman
cd ./backend || exit

# Build and start the backend server as a backgroundprocess
npm run start &
sleep 20

# Backend Api endpoint tests
newman run "https://api.getpostman.com/collections/$COLLECTION_UID?apikey=$POSTMAN_APIKEY"
