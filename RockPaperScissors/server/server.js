const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = socketio(server);
io.on('connection', (sock) => {
    sock.emit('message', 'Connected to server');
});

const clientPath = '${__dirName}/../client';
console.log('Serving static from ${clientPath}');
app.use(express.static(clientPath));

server.on('error', (err) => {
    console.error('Server error: ', err);
});

server.listen(8080, () => {
    console.log('RPS STARTED');
});

