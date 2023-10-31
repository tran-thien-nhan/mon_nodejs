const express = require('express');
const { getAllProduct, getFormCreate, createProduct } = require('../controllers/productController');

const upload = require('../controllers/middleware/uploadFile');
const productRouter = express.Router();
productRouter.get('/', getAllProduct);
productRouter.get('/create', getFormCreate);
productRouter.post('/create', upload.single('image'), createProduct);

module.exports = productRouter;
