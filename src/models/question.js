const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }, 
    number : {
        type: Number,
        required: true,
        unique: true
    },
    quiz : {
        type: String,
        required: true,
        trim: true
    },
    answer : {
        type: String,
        default: '',
        trim: true,
    },
    attributes : [
        
    ],
    reverse : {
        type: Boolean,
        default : false
    }
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question