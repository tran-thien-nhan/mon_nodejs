const express = require('express');
const laptopRouter = require('./laptopRouter');
const rootRouter = express.Router();
rootRouter.use('/', laptopRouter);
module.exports = rootRouter;