FROM node:20.13-alpine

WORKDIR /usr/src/app

COPY ./package.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5000

ENTRYPOINT ["/bin/sh", "-c", "npm run start"]