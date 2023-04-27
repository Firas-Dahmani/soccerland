var express = require('express')
var router = express.Router()
const contactController = require('../Controller/contactController')

router.post('/sendmessage', contactController.SendContact)

module.exports = router;