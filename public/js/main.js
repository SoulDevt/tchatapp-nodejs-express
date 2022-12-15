const chatForm = document.getElementById('chat-form');


const socket = io();

//message from server
socket.on("message", message => {
    console.log(message)
    outputMessage(message)
})

//catch and submit the message

chatForm.addEventListener('submit', (e) => {
    e.preventDefault(); 

    //get the message
    const msg = e.target.elements.msg.value;

    // emit message to server
    socket.emit('chatMessage', (msg) => {
        console.log(msg)
    })
})

// Output message to Dom
function outputMessage(message) {
    const div = document.createElement('div')
    div.classList.add('message');
    div.innerHTML = `						<p class="meta">Brad <span>9:12pm</span></p>
    <p class="text">
       ${message}
    </p>`

    document.querySelector('.chat-messages').appendChild(div)
}