const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const adminSchema = new mongoose.Schema({
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
    phoneNumber: {
        type: String,
        trim: true,
        validate(value) {
            if (!isMobilePhone(value)) {
                throw new error('Phone number is invalid!')
            }
        }
    },
    workAddress: {
        type: String,
    }
})

adminSchema.pre('save', async function (next) {
    const admin = this

    if (admin.isModified('password')) {
        admin.password = await bcrypt.hash(admin.password, 8)
    }

    next()
})

adminSchema.statics.findByCredentials = async (userName, password) => {
    const admin = await Admin.findOne({ userName })

    if (!admin) {
        throw new Error('Unable to Login')
    }

    const isMatch = await bcrypt.compare(password, admin.password)

    if (!isMatch) {
        throw new Error('Unable to Login')
    }

    return admin
}

const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin