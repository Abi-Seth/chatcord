const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const socketio = require('socket.io');

const server = http.createServer(app);
const io = socketio(server);

//set static files
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {

    //welcome a current user
    socket.emit('message', 'Welcome to chatcord!');

    //broadcast when a user connects
    socket.broadcast.emit('message', 'A user has joined the chat!');

    //when a user disconnects
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat!')
    })
})

const PORT = 3000 | process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));