const mongoose = require('mongoose')
const Question = require('../models/question')

devDbURL = 'mongodb://127.0.0.1:27017/chemistry-of-virtues'

async function updateDb(databaseURL) {
    await mongoose.connect(databaseURL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
        .then(() => console.log(`${databaseURL} Connected!`))
        .catch((e) => console.log(`Connection to ${databaseURL} failed with error: ${e}`))

    const questions = await Question.find({})

    questions.forEach(async (question, index) => {
        try {
            await Question.updateOne({}, { number: index })
            console.log(`Question ${index + 1} updated!`)
        } catch (e) {
            console.log(`Updating question ${index + 1} failed with error: ${e}`)
        }
    })
}

updateDb(devDbURL)