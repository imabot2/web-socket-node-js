const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);   // For getting path to the public folder


// Get current path and server static page
// const __dirname = path.resolve();
app.use(express.static('public'));


io.on('connection', (socket) => {
    
    // A new client is connecter
    console.log('A new client is connected');
    
    // If a message is received from the client, display the message in the console
    socket.on('clientToServer', (content) => {
        console.log ('Message from client : ',content);
    });

    // Every second, send a message with the date
    setInterval(() => {
        socket.emit('serverToClient', new Date);
    }, 1000)
});


server.listen(3000, () => {
    console.log('listening on *:3000');
});