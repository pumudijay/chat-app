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


//server (emit) -> client (receive) - countpdated
//client (emit) -> server (receive) - increment

// count increment
/*let count = 0
io.on('connection', (socket) => {
    console.log('New Websocket connection')

    socket.emit('countUpdated',count)

    socket.on('increment', () => {

        count++
        //socket.emit('countUpdated',count)
        io.emit('countUpdated',count)
    })
})
*/


io.on('connection', (socket) => {
    console.log('New Websocket connection')

    socket.emit('welcomeMsg','WELCOME!')

   /* socket.on('increment', () => {

        count++
        //socket.emit('countUpdated',count)
        io.emit('countUpdated', count)
    })*/
})

server.listen(port, () =>{
    console.log('Server is running 3000 ')
})