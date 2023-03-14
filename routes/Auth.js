const express = require('express');

const {login, register} = require('../controllers/auth/authController')

const router = express.Router();

//send email
router.post('/admin/dashbord', login)
router.post('/register', register)

module.exports = router;