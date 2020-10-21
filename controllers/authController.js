module.exports.sigup_get = (req, res, next) => {
    res.render('signup')
}

module.exports.login_get = (req, res, next) => {
    res.render('login')
}

module.exports.sigup_post = (req, res, next) => {
    res.send('new signup')
}

module.exports.login_post = (req, res, next) => {
    res.send('user login')
}