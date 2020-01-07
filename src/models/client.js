const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const clientSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    userName: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid!')
            }
        }
    },
    iapResults: [{
        iapResult: {
            type: String,
        }
    }]
})

clientSchema.pre('save', async function (next) {
    const client = this

    if (client.isModified('password')) {
        client.password = await bcrypt.hash(client.password, 8)
    }


    next()
})

clientSchema.statics.findByCredentials = async (userName, password) => {
    const client = await Client.findOne({ userName })

    if (!client) {
        throw new Error('Unable to Login')
    }

    const isMatch = await bcrypt.compare(password, client.password)

    if (!isMatch) {
        throw new error('Unable to Login')
    }

    return client
}

const Client = mongoose.model('Client', clientSchema)

module.exports = Client