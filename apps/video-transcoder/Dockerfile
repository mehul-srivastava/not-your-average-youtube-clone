FROM node:18.20.2-alpine

WORKDIR /usr/src/app

RUN mkdir -p /raw
RUN mkdir -p /transcoded

COPY package.json package.json
RUN npm install

COPY dist/ dist/

CMD [ "npm", "start" ]
