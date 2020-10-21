const User = require('../models/User')
const jwt = require('jsonwebtoken')

//custom error handler
const handleError = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: ''}

    //duplication error code
    if (err.code === 11000)  {
        errors.email = 'that email is already registerd'
        return errors
    }


    //validation errors
    if (err.message.includes('user validation failed')) {

        Object.values(err.errors).forEach( ({properties}) => {
            errors[properties.path] = properties.message
        })
    }

    return errors
}

const maxAge = 3 * 24 * 60 * 60

const createToken = (id) => {
    const secret = "@a4dw%2d"
    return jwt.sign({id}, secret , {
        expiresIn: maxAge
    })
}

module.exports.sigup_get = (req, res, next) => {
    res.render('signup')
}

module.exports.login_get = (req, res, next) => {
    res.render('login')
}

module.exports.sigup_post = async (req, res, next) => {
    let {email, password} = req.body
    try {
        const newUser = await User.create({
            email,
            password
        })
        //after create in db, crate token
        const token = createToken(newUser._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000} )
        res.status(201).json({
            'message': 'add success',
            user: newUser._id
        })
    } catch (err) {
        const errors = handleError(err)
        res.status(400).json({
            errors
        })
    }

}

module.exports.login_post = (req, res, next) => {
    res.send('user login')
}