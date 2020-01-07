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

module.exports = router