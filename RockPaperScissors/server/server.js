const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();

const clientPath = '${__dirName}/../../client';
console.log('Serving static from ${clientPath}');

app.use(express.static(clientPath));

const server = http.createServer(app);

const io = socketio(server);

io.on('connection', (sock) => {
    console.log('Player connected');
    sock.emit('message', 'Connected to server');

    sock.on('message', (text) => {
        io.emit('message', text);
    });
});

server.on('error', (err) => {
    console.error('Server error: ', err);
});

server.listen(3000, () => {
    console.log('RPS STARTED');
});

