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


//fire a function before doc save to db
//ห้ามใช้ arrow func เนื่องจากจะมีปัญหากับ this

userSchema.pre('save', async function (next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hashSync(this.password, salt)
    next()
})

//static method to login user
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email })
    if (user) {
        const auth = await bcrypt.compare(password, user.password)        
        if (auth) {
            return user
        }
        throw Error('incorrect password')
    }
    throw Error('incorrect email')
}

const User = mongoose.model('user', userSchema)

module.exports = User