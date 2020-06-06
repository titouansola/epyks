const { handleSocketConnection } = require('./socket');

const app = require('express')();
const server = require('http').createServer(app);

const { app: wsApp } = require('express-ws')(app, server);

app.use('/', require('express').static('web/build'));
wsApp.ws('/ws', handleSocketConnection);

server.listen(process.env.PORT || 3000, () => console.log('Server started'));