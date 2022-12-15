const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express();
const server = http.createServer(app);
const io = socketio(server)


// config statics folders
app.use(express.static(path.join(__dirname, 'public')))

//run when a client connects
io.on('connection', socket => {
   console.log('new connection established')


   //Welcome current user
   socket.emit("message", 'Welcome to Chat')

   //Broadcasting when someone connects
   socket.broadcast.emit('message', 'new user joined the chat');

   //Runs when client disconnects
   socket.on('disconnect', () => {
      io.emit('message', "a user left the chat")
   })

})
const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});