const express = require('express')
const Question = require('../models/question')
const getResult = require('../utils/demoanswers')
const router = new express.Router()

router.post('/iap/demo', async (req, res) => {
    const question = new Question(req.body)

    try {
        await question.save()
        res.status(201).send(question)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/iap/demo', async (req, res) => {
    try {
        const questions = await Question.find({})
        res.send(questions)
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/iap/demo/result', async (req, res) => {
    console.log(req.body)
    try {
        const result = getResult(req.body)
        res.send(result)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router