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
    console.log('a user connected');
    
    socket.on('message', (msg) => {
        console.log (msg);
      });

    setInterval(() => {
        socket.emit('label', new Date);
    }, 1000)


    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });


server.listen(3000, () => {
    console.log('listening on *:3000');
  });
/*
// Start the server
app.listen(3000, function() {
  console.log ('Server started on http://localhost:3000');
});*/