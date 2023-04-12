// For web server
const express = require('express');
const app = express();

// For http server
const http = require('http');
const server = http.createServer(app);

// For web socket
const { Server } = require("socket.io");
const io = new Server(server);   


// Get current path and server static page
app.use(express.static('public'));


// Each time a new client is connected a new socket is created
io.on('connection', (socket) => {
    
    // A new client is connected, display a message
    console.log('A new client is connected');
    
    // If a message is received from the client, display the message in the console
    socket.on('clientToServer', (content) => {
        console.log ('Message from client:',content);
    });

    // Every second, send a message with the date
    setInterval(() => {
        socket.emit('serverToClient', new Date);
    }, 1000)
});

// Start the http server (express + sockets)
server.listen(3000, () => {
    console.log('listening on *:3000');
});