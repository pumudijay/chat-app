const path = require('path')
const http = require('http')
const express = require('express')


const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server) 

//app.set = app.get("io")

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname,'../public')

app.use(express.static(publicDirectoryPath))

io.on('connection', () => {
    console.log('New Websocket connection')
})

app.listen(port, () =>{
    console.log('Server is running ${port} ')
})