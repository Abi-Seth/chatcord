const socket = io();

socket.on('message', (message) => {
    console.warn(message)
})