# Interview Scheduler

Interview Scheduler is a scheduling app built in React. Data is saved to a PostgreSQL database and updates are received from the server using websockets. 

![Application screenshot](https://github.com/sydney-sisco/scheduler/blob/master/docs/application.png?raw=true)

A demonstration of the application flow:
![Application animation](https://github.com/sydney-sisco/scheduler/blob/master/docs/appointment.gif?raw=true)

A demonstration of websockets. When one client makes a change, the server uses a websocket connection to notify all connected clients of the change.
![websocket animation](https://github.com/sydney-sisco/scheduler/blob/master/docs/websockets.gif?raw=true)

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
