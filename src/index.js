const express = require('express')
require('./db/mongoose')
const questionsRouter = require('./routers/quiz')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(questionsRouter)

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})