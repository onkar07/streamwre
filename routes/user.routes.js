const express = require('express')
const router = express.Router()
const user = require('../controller/user.controller')

router.post('/',user.login)
router.get('/stream',user.stream)
module.exports = router;