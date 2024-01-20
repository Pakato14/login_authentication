const { Router } = require('express')
const RoleController = require('../controllers/RoleController')


const router = Router()
router.post('/registerRole', RoleController.registerRole)
router.get('/role', RoleController.getRole)

module.exports = router