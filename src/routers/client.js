const express = require('express')
const bodyParser = require('body-parser')
const Client = require('../models/client')
const { authClient, authAdmin } = require('../middleware/auth')
const router = new express.Router()

const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/client', urlencodedParser, authAdmin, async (req, res) => {
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

router.delete('/client', urlencodedParser, authAdmin, async (req, res) => {
    try {
        await Client.deleteOne({ userName: req.body.userName })
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router