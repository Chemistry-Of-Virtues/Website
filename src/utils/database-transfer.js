const mongoose = require('mongoose')
const Question = require('../models/question')

const localDb1 = 'mongodb://127.0.0.1:27017/chemistry-of-virtues'
const localDb2 = 'mongodb://127.0.0.1:27017/chemistry-of-virtues-test'
const prodDb1 = 'mongodb+srv://weylinmorris:weylinmorrisDB!@chemistry-of-virtues-niqho.mongodb.net/test?retryWrites=true&w=majority'
const prodDb2 = 'mongodb+srv://weylinmorris:weylinmorrisDB!@chemistry-of-virtues-niqho.mongodb.net/production?retryWrites=true&w=majority'

const titleCase = (str) => {
    let splitStr = str.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    return splitStr.join(' '); 
 }

const transferQuestions = async (dbFrom, dbTo) => {
    await mongoose.connect(dbFrom, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    }, () => console.log(`${dbFrom} Connected!`))
        .catch((e) => console.log(`Connection to ${dbFrom} failed with error: ${e}`))
    
    const dbFromQuestions = await Question.find({})
        .catch((e) => console.log(`Find questions failed with error: ${e}`))
    console.log(dbFromQuestions)

    await mongoose.disconnect()
        .then(() => console.log('Disconnected!'))
        .catch((e) => console.log(`Failed to disconnect with error: ${e}`))
    
    await mongoose.connect(dbTo, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    }, () => console.log(`${dbTo} Connected!`))
        .catch((e) => console.log(`Connection to ${dbTo} failed with error: ${e}`))

    await dbFromQuestions.forEach(async (question, index) => {
        const questionToSave = new Question({})
        // Code to alter questions here

        questionToSave.question = question.question
        question.attributes.forEach((attribute) => {
            questionToSave.attributes.push({
                "name": titleCase(attribute),
                "reversed": false
            })
        })

        try {
            await questionToSave.save()
            console.log(`Question no. ${index + 1} saved!`)
        } catch (e) {
            console.log(`Failed to save question no. ${index + 1} with error: ${e}`)
        }
    })

    const dbToQuestions = await Question.find({})
        .catch((e) => console.log(`Find questions failed with error: ${e}`))
    console.log(dbToQuestions)
}

// transferQuestions(prodDb1, prodDb2)