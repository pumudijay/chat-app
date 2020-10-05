const socket = io()

//Elements
const $messageForm = document.querySelector('#messageForm')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocationButton = document.querySelector('#sendLocation')
const $messages = document.querySelector('#messages')

//Templates
const messageTemplate = document.querySelector('#messageTemplate').innerHTML
const locationMessageTemplate = document.querySelector('#locationMessageTemplate').innerHTML

//Options
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true})

socket.on('message', (message) => {
    console.log(message)
    const html = Mustache.render(messageTemplate,{
        username: message.username,
        message : message.text,
        createdAt : moment(message.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend',html)
})

socket.on('locationMessage', (message) => {
    console.log(message)
    const html=Mustache.render(locationMessageTemplate,{
        username: message.username,
        url: message.url,
        createdAt: moment(message.createdAt).format('h:mm a') 
    })
    $messages.insertAdjacentHTML('beforeend', html)
})

$messageForm.addEventListener('submit', (e) =>{
    e.preventDefault()

    $messageFormButton.setAttribute('disabled', 'disabled')

    const message = e.target.elements.message.value
    //const message = document.querySelector('input').value

    //socket.emit('sendMessage', message)
    socket.emit('sendMessage', message, (error) => {
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()
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

socket.emit('join', { username, room}, (error) => {
    if (error) {
        alert(error)
        location.href = '/'
    }
})