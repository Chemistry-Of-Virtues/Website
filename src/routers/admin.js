const express = require('express')
const bodyParser = require('body-parser')
const Admin = require('../models/admin')
const Client = require('../models/client')
const { authAdmin } = require('../middleware/auth')
const router = new express.Router();

const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/admin', async (req, res) => {
    const admin = new Admin(req.body)

    try {
        await admin.save()
        const token = await admin.generateAuthToken()
        res.status(201).send({ admin, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/admin/login', urlencodedParser, async (req, res) => {
    console.log('Admin Login Route Requested')
    try {
        const admin = await Admin.findByCredentials(req.body.userName, req.body.password)
        const token = await admin.generateAuthToken()
        res.send({ admin, token })
        console.log('Authentication Successful', req.body)
    } catch (e) {
        res.status(400).send('Login Failed')
        console.log('Authentication Failed', req.body)
    }
})

router.post('/admin/logout', authAdmin, async (req, res) => {
    try {
        req.admin.tokens = req.admin.tokens.filter((token) => token.token !== req.token)
        await req.admin.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/admin/clients', authAdmin, async (req, res) => {
    try {
        await req.admin.populate('clients').execPopulate()
        res.send(req.admin.clients)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router