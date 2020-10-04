const path = require('path')
const http = require('http')
const express = require('express')
const socketio =  require('socket.io')

const publicDirectoryPath = path.join(__dirname, '/../public')
const port = process.env.PORT || 3000

let app = express()
let server = http.createServer(app)
let io = socketio(server) 

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
    console.log('New Websocket connection')

    socket.emit('message','WELCOME!')

    socket.on('sendMessage', (message) => {
        io.emit('message', message)
        
    })
})

server.listen(port, () =>{
    console.log('Server is running 3000 ')
})