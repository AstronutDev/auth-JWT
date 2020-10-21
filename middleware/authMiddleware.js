const jwt = require('jsonwebtoken')

const requireAuth = (req, res, next) => {

    //grab token form cookie
    const token = req.cookies.jwt

    //check jwt exist & verify
    if (token) {
        jwt.verify(token, '@a4dw%2d', (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/login')
            }
            else {
                console.log(decodedToken);
                next()
            }
        }) 
    }
    else {
        res.redirect('/login')
    }
}

module.exports = { requireAuth }