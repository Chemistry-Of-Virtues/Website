const express = require('express');
const Admin = require('../models/admin')
const router = new express.Router();

router.post('/admin', async (req, res) => {
    const admin = new Admin(req.body)

    try {
        await admin.save()
        res.status(201).send(admin)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router