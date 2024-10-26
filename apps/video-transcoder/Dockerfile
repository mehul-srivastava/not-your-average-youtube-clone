FROM node:18.20.2-alpine

RUN apk add --no-cache ffmpeg

WORKDIR /usr/src/app

RUN mkdir -p /usr/src/app/raw
RUN mkdir -p /usr/src/app/transcoded

COPY package.json package.json
RUN npm install

COPY dist/ dist/

COPY scripts/ scripts/
RUN chmod 777 scripts/*

CMD [ "npm", "start" ]
