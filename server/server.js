const path = require('path')
const http = require('http')
const express = require("express")
const socketIO =require('socket.io')
const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000

var app = express()
var server = http.createServer(app)
var io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log('new user connected')

  socket.emit('newMessage', {
    from: 'me2@here.com',
    text: 'Here is the new message',
    createdAt: '11:47:23'
  })

  socket.on('createMessage', (message)=> {
    console.log(`Recieved a new message from ${message.from} she says \"${message.text}\"`)
  })


  socket.on('Disconnect', () => {
    console.log('User disconnected from client');
  })
})



server.listen(port, () => {
  console.log(`Started on port ${port}`)
})