const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
require('./db/mongoose')
const questionsRouter = require('./routers/quiz')
const adminRouter = require('./routers/admin')
const clientRouter = require('./routers/client')

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const port = process.env.PORT

const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))
app.use(express.json())
app.use(questionsRouter)
app.use(adminRouter)
app.use(clientRouter)

// Socket.io stuff for the chat functionality
io.on('connection', (socket) => {
    console.log('New socket connection.')

    socket.on('sendMessage', (message, callback) => {
        io.emit('receiveMessage', message)
        callback('Delivered Message')
    })

    socket.on('sendImage', (message, callback) => {
        io.emit('receiveImage', message)
        callback('Delivered Image')
    })
})
 
server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})