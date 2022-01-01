const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages');

const socket = io();

//message from server
socket.on('message', (message) => {
    outputMessage(message);
    
    //scroll down when a new message is got
    chatMessages.scrollTop = chatMessages.scrollHeight;
})

//message submit logic
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get text message
    const msg = e.target.elements.msg.value;

    //emit message
    socket.emit('chatMessage', msg);

    //clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
})

//output message to DOM
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">Brad <span>9:12pm</span></p>
    <p class="text">
        ${message}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}