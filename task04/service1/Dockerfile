FROM node:20-alpine

WORKDIR /webapps

COPY ./package*.json ./

RUN npm install

COPY ./ ./

CMD [ "npm", "start" ]