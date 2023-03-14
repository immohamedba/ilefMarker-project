const express = require('express');

const {sendEmail} = require('../controllers/mailService/mailSender')

const router = express.Router();

//send email
router.post('/', sendEmail)

module.exports = router;