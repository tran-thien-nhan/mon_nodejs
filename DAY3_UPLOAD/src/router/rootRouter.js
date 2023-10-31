const express = require('express');
const productRouter = require('./productRouter');
const rootRouter = express.Router();
rootRouter.use('/product', productRouter);
module.exports = rootRouter;