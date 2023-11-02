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

const getFormEdit = async (req, res) => {
    const { id } = req.params;
    await Product.findById(id)
        .then(result => {
            res.render('edit', { errors: null, data: result });
        })
        .catch(err => {
            res.redirect("/product");
        })
}

const editProduct = async (req, res) => {
    let { id, name, price, current_image } = req.body;
    let imageUrl;
    if (req.file) {
        imageUrl = `/upload/${req.file.filename}`;
    } else {
        imageUrl = current_image;
    }
    const dataSubmit = {
        id: id,
        name: name,
        price: price,
        image: imageUrl
    }
    const opts = { runValidators: true };
    await Product.updateOne({}, dataSubmit, opts)
        .then(result => {
            req.session.message = "Product updated successfully";
            res.redirect("/product");
        })
        .catch(err => {
            let errors = {};
            if (err.name === 'ValidationError') {
                for (const field in err.errors) {
                    errors[field] = err.errors[field].message;
                }
                res.render('edit', { errors, data: dataSubmit });
            }
        })
}

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id)
        .then(result => {
            //kt có hình ảnh mới xóa
            if (result.image != '') {
                try {
                    fs.unlinkSync('./src/public/' + result.image);
                } catch (error) {
                    console.log(err);
                }
            }
            req.session.message = "product deleteed successfully";
            res.redirect('/product');
        })
        .catch(err => {
            console.log("error delete: ", err);
        })
}

const nhapForm = (req, res) => {
    res.render('nhap', { data: null, errors: null });

}

module.exports = {
    getAllProduct, getFormCreate, createProduct, deleteProduct, editProduct, getFormEdit, nhapForm
}