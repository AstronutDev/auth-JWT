const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { isEmail } = require('validator')

const userSchema = new Schema({
    "email": {
        type: String,
        required: [true, 'Please enter the email'],
        unique: true,
        // lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    "password": {
        type: String,
        required: [true, 'Please enter the password'],
        minlength: [6, 'Minimum password length is 6 characters']
    }
})

module.exports = mongoose.model('user', userSchema)