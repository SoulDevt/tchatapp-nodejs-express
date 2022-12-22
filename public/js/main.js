const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

//Get username and room from URL

const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})


const socket = io();

// join Chatroom
socket.emit('joinRoom', { username, room })

//message from server
socket.on("message", message => {
    console.log(message)
    outputMessage(message)

    //Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
})

//catch and submit the message

chatForm.addEventListener('submit', (e) => {
    e.preventDefault(); 

    //get the message
    const msg = e.target.elements.msg.value;

    // emit message to server
    socket.emit('chatMessage', msg)

    //clean input submit
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
})

// Output message to Dom
function outputMessage(message) {
    const div = document.createElement('div')
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username}<span>${message.time}</span></p>
    <p class="text">
       ${message.text}
    </p>`

    document.querySelector('.chat-messages').appendChild(div)
}