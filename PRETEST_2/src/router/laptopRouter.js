const express = require('express');
const { getAllLaptop, getFormCreate, createLaptop, viewUpdateLaptop, updateLaptop, deleteLaptop, sortBookName, searchLaptopByPrice} = require('../controllers/laptopController');

const upload = require('../controllers/middleware/uploadFile');
const laptopRouter = express.Router();
laptopRouter.get('/laptop', getAllLaptop);
laptopRouter.get('/create', getFormCreate);
laptopRouter.post('/create', upload.single('image'), createLaptop);
laptopRouter.get('/delete/:id', deleteLaptop);
laptopRouter.get('/update/:id', viewUpdateLaptop);
laptopRouter.post('/update/:id', upload.single('image'), updateLaptop);
laptopRouter.get('/sort', sortBookName);
laptopRouter.get('/search', searchLaptopByPrice);

module.exports = laptopRouter;
