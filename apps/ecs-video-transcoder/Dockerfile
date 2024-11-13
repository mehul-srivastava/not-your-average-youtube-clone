FROM node:18.20.2-alpine

RUN apk add --no-cache ffmpeg

WORKDIR /usr/src/app

COPY package.json package.json
RUN npm install

COPY dist/ dist/

COPY scripts/ scripts/
RUN chmod 777 scripts/*

CMD [ "npm", "start" ]
