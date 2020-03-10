const router = require('express').Router()
const UserController = require('../controllers/userController')

router.post('/register', UserController.registerUser)
router.post('/login', UserController.loginUser)
router.post('/googlelogin', UserController.googleLoginUser)

module.exports = router