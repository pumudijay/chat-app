const socket = io()

socket.on('message', (message) => {
    console.log(message)
})

document.querySelector('#messageForm').addEventListener('submit', (e) =>{
    e.preventDefault()

    const message = e.target.elements.message.value
    //const message = document.querySelector('input').value
    socket.emit('sendMessage',message,(error) => {
        if(error){
            return console.log(error)
        }

        console.log('Message delivered')
    })
})

document.querySelector('#sendLocation').addEventListener('click', () => {
    if(!navigator.geolocation){
        return alert('Geo location not supported in your browser.')

    }

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        }, () => {
            console.log('Location shared')
        })
    })
})