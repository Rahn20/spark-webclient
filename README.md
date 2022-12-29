# Spark-webclient

This repository is part of a group project in Program development in virtual team course (vteam) at [Blekinge Institute of Technology](https://www.bth.se/). The group project consists of several parts, and this is one of them.

**The program is under development.**

## Setup

There are two ways to get the system running: either you start all components (backend, frontend, mobile app and scooter program) locally, or you use the dockerized version.

## Run with Docker

Your system must have [Docker](https://www.docker.com/get-started/) enabled.

## Local

### Installation

Clone this repo, go to spark-webclient and run:

```
npm install
npm run dev
```

If you change the style then you can run ```npm run style``` before ```npm run build``` or dev.

Go to **http://localhost:1338** to view the webpage, if you want to change the port, you can do it from webpack.dev.config.js. If you get any issues that the server is still running in the background even when you press CTRL + C to stop it. Then you need to stop it manually by using the *taskkill* command or change the port number.
Use the *netstat* command to list all the active connections and the ports they are using. 

```
netstat -a -o -n
```

We are looking for local address 127.0.0.1:1338, check the PID that's the connection has and run:

```
taskkill /F /PID <process-id>
```

Replace process-id with the process ID of the process you want to stop. The /F flag forces the process to stop, and the /PID flag specifies the process ID.
