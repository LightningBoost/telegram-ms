FROM node:15-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json

RUN yarn install

COPY . /app

RUN yarn run generate

EXPOSE 4000
