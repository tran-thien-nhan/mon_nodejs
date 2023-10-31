const fs = require('fs');
const Product = require('../models/Product');

const getAllProduct = async (req, res) => {
    const products = await Product.find({});
    res.render('list', { products });
}

const getFormCreate = (req, res) => {
    res.render('create', { data: null, errors: null });
}

const createProduct = async (req, res) => {
    let { name, price } = req.body;
    let imageUrl = req.file ? `/upload/${req.file.filename}` : '';
    const dataSubmit = {
        name: name,
        price: price,
        image: imageUrl
    }
    await Product.create(dataSubmit)
        .then(result => {
            req.session.message = "Product create successfully";
            res.redirect('/product');
        })
        .catch(err => {
            let errors = {};
            if (err.name === 'ValidationError') {
                for (const field in err.errors) {
                    errors[field] = err.errors[field].message;
                }
                res.render('create', { errors, data: dataSubmit });
            }
        })
}

module.exports = {
    getAllProduct, getFormCreate, createProduct
}