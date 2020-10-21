const express = require('express')
const router = express.Router()

const authController = require('../controllers/authController')

router.get('/signup', authController.sigup_get)

router.post('/signup', authController.sigup_post)

router.get('/login', authController.login_get)

router.post('/login', authController.login_post)

module.exports = router