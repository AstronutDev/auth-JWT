const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

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

//fire a function after doc save to db
// userSchema.post('save', (doc, next) => {
//     console.log(('new user was create & save', doc));
//     next()
// })

//fire a function before doc save to db

//ห้ามใช้ arrow func 

userSchema.pre('save', async function (next){
    const salt = await bcrypt.genSalt();
    console.log(this.password);
    this.password = await bcrypt.hashSync(this.password, salt)
    next()
})

module.exports = mongoose.model('user', userSchema)