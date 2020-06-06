const { handleSocketConnection } = require('./socket');

const app = require('express')();
const server = require('http').createServer(app);

const { app: wsApp } = require('express-ws')(app, server);

wsApp.ws('/', handleSocketConnection);

server.listen(3000, () => console.log('Server started'));