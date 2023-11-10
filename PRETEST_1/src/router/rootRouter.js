const express = require('express');
const bookRouter = require('./bookRouter');
const rootRouter = express.Router();
rootRouter.use('/', bookRouter);
module.exports = rootRouter;