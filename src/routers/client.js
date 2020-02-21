const express = require('express')
const bodyParser = require('body-parser')
const Client = require('../models/client')
const { authClient, authAdmin } = require('../middleware/auth')
const router = new express.Router()

const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/client', authAdmin, async (req, res) => {
    const client = new Client({
        ...req.body,
        adminId: req.admin._id
    })

    try {   
        await client.save()
        res.status(201).send({ client })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/client/login', urlencodedParser, async (req, res) => {
    console.log('Client Login Route Requested:', req.body)
    try {
        const client = await Client.findByCredentials(req.body.userName, req.body.password)
        const token = await client.generateAuthToken()
        res.send({ client, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/client/logout', authClient, async (req, res) => {
    try {
        req.client.tokens = req.client.tokens.filter((token) => token.token !== req.token)
        await req.client.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router