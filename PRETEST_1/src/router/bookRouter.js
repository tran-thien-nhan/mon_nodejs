const express = require('express');
const { viewBook, viewCreateBook, createBook, viewUpdateBook, updateBook, deleteBook, sortBookPrice, searchBookName } = require('../controllers/bookController');
const bookRouter = express.Router();

bookRouter.get('/book', viewBook);
bookRouter.get('/create', viewCreateBook);
bookRouter.post('/create', createBook);
bookRouter.get('/update/:id', viewUpdateBook);
bookRouter.post('/update/:id', updateBook);
bookRouter.get('/delete/:id', deleteBook);
bookRouter.get('/sort', sortBookPrice);
bookRouter.get('/search', searchBookName);

module.exports = bookRouter;
