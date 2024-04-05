const Router = require('express')
const router = new Router()

const dataController = require('../controllers/data.controller')

// создать
router.post('/data', dataController.createData)

// показать всех
router.get('/data', dataController.getData)

module.exports = router
