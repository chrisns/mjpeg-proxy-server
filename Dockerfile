FROM node:alpine

RUN apk update && \
    apk add make python g++

RUN mkdir /app
WORKDIR /app
COPY package.json .
RUN npm install -s --prod
COPY . .

CMD npm start

HEALTHCHECK CMD wget -q localhost:3000 -O /dev/null || exit 1