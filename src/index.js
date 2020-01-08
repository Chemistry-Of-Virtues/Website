const path = require('path')
const express = require('express')
require('./db/mongoose')
const questionsRouter = require('./routers/quiz')
const adminRouter = require('./routers/admin')
const clientRouter = require('./routers/client')

const app = express()
const port = process.env.PORT
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))
app.use(express.json())
app.use(questionsRouter)
app.use(adminRouter)
app.use(clientRouter)

// app.get('', (req, res) => {
//     res.send()
// })

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})