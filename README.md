[![CircleCI](https://dl.circleci.com/status-badge/img/gh/Rahn20/spark-webclient/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/Rahn20/spark-webclient/tree/main)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/Rahn20/spark-webclient/badges/quality-score.png?b=main)](https://scrutinizer-ci.com/g/Rahn20/spark-webclient/?branch=main)
[![Code Coverage](https://scrutinizer-ci.com/g/Rahn20/spark-webclient/badges/coverage.png?b=main)](https://scrutinizer-ci.com/g/Rahn20/spark-webclient/?branch=main)
[![Build Status](https://scrutinizer-ci.com/g/Rahn20/spark-webclient/badges/build.png?b=main)](https://scrutinizer-ci.com/g/Rahn20/spark-webclient/build-status/main)


# Spark-webclient

This repository is part of a group project in Program development in virtual team course (Vteam) at [Blekinge Institute of Technology](https://www.bth.se/). The group project consists of several parts, and this is one of them.

![Payment page](docs/paymentPage.png)

## Technologies and frameworks used
* Mithril.js
* Webpack
* Scss
* Bootstrap
* HTML


## Setup

There are two ways to get the system running: either you start all components (backend, frontend (admin), mobile app, customer webclient and scooter program) locally, or you use the dockerized version.


## Run with Docker

Your system must have [Docker](https://www.docker.com/get-started/) enabled.

You need to run the backend before running the application. The webclient is part of a large system. You can find all subsystems along with ***docker-compose.yml*** in this [repository](https://github.com/sumca252/spark).

```
docker-compose up spark-webclient
```

### Build and run docker image

Path /spark-webclient

```
docker build -t webclient .
docker run --rm -it -p 1338:1338 webclient
```

## Local

### Installation

To run the webclient locally, you need [Nodejs](https://nodejs.org/en/download/) and [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installed on your machine. Once you have Node.js and npm installed, clone this repo, move to spark-webclient and run:

```
npm install

# for development mode
npm run dev

# for production mode
npm run build
```

If you change the style, then you can run ```npm run style```.

Navigate to ```http://localhost:1338``` to view the webpage. The app will automatically reload if you change any of the source files. If you want to change the port, you can do it from webpack.dev.config.js.

If you get any problems that the server is still running in the background when you try to press CTRL + C to stop it and run it again. Then you need to stop it manually using the *taskkill* command or change the port number if you want. Use the *netstat* command to list all the active connections and the ports they are using. 

```
netstat -a -o -n | grep 127.0.0.1:1338
```

We are looking for local address 127.0.0.1:1338 that has the state LISTENING, check the PID that's the connection has and run:

```
taskkill /F /PID <process-id>
```

Replace process-id with the process ID of the process you want to stop. The /F flag forces the process to stop, and the /PID flag specifies the process ID.

### Testing

These packages have been used to test the application.
* [Mocha](https://www.npmjs.com/package/mocha)
* [Chai](https://www.npmjs.com/package/chai)
* [Mithril-query](https://www.npmjs.com/package/mithril-query)
* [Istanbul](https://www.npmjs.com/package/nyc)
* [ESLint](https://www.npmjs.com/package/eslint)
* [Sinon.JS](https://www.npmjs.com/package/sinon)

You can run your tests using this command.
```
npm run mocha
```

Run tests and view code coverage
```
npm run test
```

To clean your code coverage you can use.
```
npm run clean-cov
```

#### ESLint

```
npm run lint
```
