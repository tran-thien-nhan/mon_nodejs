const express = require('express');
const { getAllProduct, getFormCreate, createProduct, deleteProduct } = require('../controllers/productController');

const upload = require('../controllers/middleware/uploadFile');
const productRouter = express.Router();
productRouter.get('/', getAllProduct);
productRouter.get('/create', getFormCreate);
productRouter.post('/create', upload.single('image'), createProduct);
productRouter.get('/delete/:id', deleteProduct);

module.exports = productRouter;
