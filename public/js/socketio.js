const socket = io()

// Image base64 string
let srcData = ''

// Elements used for messaging
// Message form must have id="message-form"
// Messages must be displayed in a div with id="messages"
// Images input must have id="send-image"
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $messages = document.querySelector('#messages')
const $imageInput = document.querySelector('#send-image')

// Function to scroll to the bottom of the messages div when new message is received
const autoscroll = () => {
    const $newMessage = $messages.lastElementChild
    const newMessageMargin = (parseInt(getComputedStyle(newMEssage).marginBottom) + 
        parseInt(getComputedStyle($newMessage).marginTop))
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin
    const viewHeight = $messages.offsetHeight
    const containerHeight = $messages.scrollHeight
    const scrollOffset = $messages.scrollTop + viewHeight

    if (containerHeight - newMessageHeight <= scrollOffset) {
        $messages.scrollTop = $messages.scrollHeight
    }
}

// Function to encode images
const encode = () => {
    let selectedfile = document.getElementById("send-image").files
    if (selectedfile.length > 0) {
        const imageFile = selectedfile[0]
        const fileReader = new FileReader()

        fileReader.onload = (fileLoadEvent) => {
            srcData = fileLoadEvent.target.result
            const newImage = document.createElement('img')
            newImage.src = srcData
        }
        fileReader.readAsDataURL(imageFile)
    }
}

// Route to receive messages
socket.on('receiveMessage', (message) => {
    // Message code here
    console.log(message)
    autoscroll()
})

socket.on('receiveImage', (message) => {
    // Image message code here
    autoscroll()
})

// Send messages when submitted
$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()

    $messageFormButton.setAttribute('disabled', 'disabled')

    // Determine if image is being sent
    if ($imageInput.files[0]) {
        socket.emit('sendImage', srcData, (message) => {
            $imageInput.value = null
            $messageFormInput.focus()
        })
    }

    // Determine if text is being sent
    if (e.target.elements.message.value) {
        socket.emit('sendMessage'. e.target.elements.message.value, (message) => {
            $messageFormInput.value = ''
            $messageFormInput.focus()
        })
    }

    $messageFormButton.removeAttribute('disabled')
})