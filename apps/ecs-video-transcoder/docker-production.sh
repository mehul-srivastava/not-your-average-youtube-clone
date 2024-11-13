#!/bin/bash

# Must login to AWS ECR through CLI

set -e

npm install
npm run build

# Run this if not logged in: aws ecr get-login-password --region eu-north-1 | docker login --username AWS --password-stdin 886436961672.dkr.ecr.eu-north-1.amazonaws.com
docker build -t youtube-clone/video-transcoder .
docker tag youtube-clone/video-transcoder:latest 886436961672.dkr.ecr.eu-north-1.amazonaws.com/youtube-clone/video-transcoder:latest
docker push 886436961672.dkr.ecr.eu-north-1.amazonaws.com/youtube-clone/video-transcoder:latest

echo "Docker image pushed to AWS registry"