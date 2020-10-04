const socket = io()

/*socket.on('countUpdated', (count) => {
    console.log('The count has been updated!', count)
})

document.querySelector('#increment').addEventListener('click', () => {
    console.log('Clicked')
    socket.emit('increment')
})
*/

socket.on('message', (message) => {
    console.log(message)
})

document.querySelector('#messageForm').addEventListener('submit', (e) =>{
    e.preventDefault()

    const message = e.target.elements.message.value
    //const message = document.querySelector('input').value
    socket.emit('sendMessage',message)
})