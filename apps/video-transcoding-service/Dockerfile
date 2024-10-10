FROM node:18.20.2-alpine

RUN apk add --no-cache ffmpeg

WORKDIR /usr/src/app

RUN mkdir -p /raw
RUN mkdir -p /transcoded

COPY package.json package.json
RUN npm install

COPY dist/ dist/

CMD [ "npm", "start" ]

# Definitely run `npm run build` before building the images