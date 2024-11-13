#!/bin/bash

# --------------- Run this instead of building the docker image through CLI --------------- #

set -e

npm install

docker build -t youtube-clone/video-transcoder .
docker run --env-file .env youtube-clone/video-transcoder