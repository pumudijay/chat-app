const path = require('path')
const http = require('http')
const express = require('express')
const socketio =  require('socket.io')
const {generateMessage, generateLocationMessage } = require('./utilis/messages')

const publicDirectoryPath = path.join(__dirname, '/../public')
const port = process.env.PORT || 3000

let app = express()
let server = http.createServer(app)
let io = socketio(server) 

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
    console.log('New Websocket connection')

    socket.emit('message', generateMessage('WELCOME!'))
    socket.broadcast.emit('message', generateMessage('A new user joined!'))

    socket.on('sendMessage', (message) => {
        io.emit('message', generateMessage(message))        
    })

    socket.on('sendLocation', (coords,callback) => {
        io.emit('locationMessage', generateLocationMessage('https://google.com/maps/@'+coords.latitude+ ',' +coords.longitude))
        callback()
    })

    socket.on('disconnect', () => {
        io.emit('message', generateMessage('A user has left'))
    })
})

server.listen(port, () =>{
    console.log('Server is running 3000 ')
})