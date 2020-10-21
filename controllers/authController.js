const User = require('../models/User')

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
        newUser.save()
        res.status(201).json({
            'message': 'add success',
            newUser
        })
    } catch (error) {
        res.status(400).json({
            'message': 'add user fail'
        })
    }

}

module.exports.login_post = (req, res, next) => {
    res.send('user login')
}