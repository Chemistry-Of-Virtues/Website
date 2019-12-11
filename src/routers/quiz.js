const express = require('express')
const Question = require('../models/question')
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

router.post('/iap/demo/initpopulate', async (req, res) => {
    try {
        const questions = req.body
        questions.forEach(async (question) => {
            let newQuestion = new Question(question)
            await newQuestion.save()
        })
        res.status(201).send(questions)
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

router.patch('/iap/demo/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['answer']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Updates!' })
    }

    try {
        const question = await Question.findById(req.params.id)

        updates.forEach((update) => question[update] = req.body[update])
        await question.save()

        if (!question) {
            return res.status(404).send()
        }

        res.send(question)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router