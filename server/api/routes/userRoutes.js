const { Router } = require('express')
const UserController = require('../controllers/UserController')


const router = Router()
router.get('/')
router.post('/register', UserController.registerUser)
router.post('/login', UserController.login)
router.get('/user', UserController.authenticatedUser)
router.post('/logout', UserController.logout)

module.exports = router