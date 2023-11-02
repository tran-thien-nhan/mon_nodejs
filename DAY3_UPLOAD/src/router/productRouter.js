const express = require('express');
const { getAllProduct, getFormCreate, createProduct, deleteProduct, editProduct, getFormEdit, nhapForm } = require('../controllers/productController');

const upload = require('../controllers/middleware/uploadFile');
const productRouter = express.Router();
productRouter.get('/', getAllProduct);
productRouter.get('/create', getFormCreate);
productRouter.post('/create', upload.single('image'), createProduct);
productRouter.get('/delete/:id', deleteProduct);
productRouter.get('/edit/:id', getFormEdit);
productRouter.post('/edit/:id', upload.single('image'), editProduct);

productRouter.get('/nhap', nhapForm);

module.exports = productRouter;
