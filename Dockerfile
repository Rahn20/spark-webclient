FROM node:latest


WORKDIR /webclient

COPY package*.json ./

RUN npm install

#COPY / .
COPY ./src ./src
COPY ./public ./public
COPY .env.example ./
COPY webpack.dev.config.js ./


EXPOSE 1338

CMD npm run docker
