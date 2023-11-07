const express = require('express');
const {
    getFormSendMail,
    sendMailNodejs
} = require('../controllers/mailController');

const emailRouter = express.Router();

emailRouter.get('/email', getFormSendMail);
emailRouter.post('/email', sendMailNodejs);
module.exports = emailRouter;