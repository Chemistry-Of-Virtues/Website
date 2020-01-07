const express = require('express')
const Client = require('../models/client')
const router = new express.Router()

router.post('/client', async (req, res) => {
    const client = new Client(req.body)

    try {   
        await client.save()
        res.status(201).send(client)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/client/login', async (req, res) => {
    try {
        const client = await Client.findByCredentials(req.body.userName, req.body.password)
        res.send(client)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router