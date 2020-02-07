const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }, 
    answer : {
        type: String,
        default: '',
        trim: true,
    },
    attributes : [
        
    ],
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question