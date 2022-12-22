const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const formatMessage = require('./utils/messages')

const app = express();
const server = http.createServer(app);
const io = socketio(server)




// config statics folders
app.use(express.static(path.join(__dirname, 'public')))

const botName = 'ChatCord Bot';

//run when a client connects
io.on('connection', socket => {
   console.log('new connection established')


   //Welcome current user
   socket.emit("message", formatMessage(botName, 'Welcome to Chat !'))

   //Broadcasting when someone connects
   socket.broadcast.emit('message', formatMessage(botName,'new user joined the chat'));

   //Runs when client disconnects
   socket.on('disconnect', () => {
      io.emit('message', formatMessage(botName,"a user left the chat"));
   })

   // Lister for chat Message
   socket.on('chatMessage', (msg) => {
      io.emit('message', formatMessage('USER',msg))
   })

})
const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});