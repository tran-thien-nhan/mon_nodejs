const Book = require('../models/Book');

const viewBook = async (req, res) => {
    const books = await Book.find({});
    res.render('list', { books });
}

const viewCreateBook = async (req, res) => {
    res.render('create', { data: null, errors: null });
}

const createBook = async (req, res) => {
    let { name, price, quantity } = req.body;
    const dataSubmit = {
        name: name,
        price: price,
        quantity: quantity
    }
    await Book.create(dataSubmit)
        .then(result => {
            req.session.message = "Book created successfully";
            res.redirect('/book');
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

const viewUpdateBook = async (req, res) => {
    const { id } = req.params;
    await Book.findById(id)
        .then(result => {
            res.render('update', { errors: null, data: result });
        })
        .catch(err => {
            res.redirect("/book");
        })
}

const updateBook = async (req, res) => {
    const { id, name, price, quantity } = req.body;
    try {
        const book = await Book.findOneAndUpdate(
            { _id: id }, // Tìm sản phẩm dựa trên _id
            {
                name,
                price,
                quantity,
            },
            { new: true, runValidators: true }
        );

        if (!book) {
            return res.status(404).json({ error: 'book not found' });
        }

        req.session.message = "book updated successfully";
        console.log(book);
        res.redirect("/book");
    } catch (err) {
        if (err.name === 'ValidationError') {
            const errors = {};
            for (const field in err.errors) {
                errors[field] = err.errors[field].message;
            }
            return res.render('update', { errors, data: req.body });
        }

        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const deleteBook = async (req, res) => {
    const { id } = req.params;
    await Book.findByIdAndDelete(id)
        .then(result => {
            req.session.message = "book deleted successfully";
            res.redirect('/book');
        })
        .catch(err => {
            console.log("error delete: ", err);
        })
}

const sortBookPrice = async (req, res) => {
    try {
        const books = await Book.find({}).sort({ price: 1 }); // 1 cho tăng, -1 cho giảm
        res.render('sort', { books });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const searchBookName = async (req, res) => {
    try {
        const searchQuery = req.query.search; // Lấy thông tin tìm kiếm từ query parameters
        const books = await Book.find({ name: { $regex: searchQuery, $options: 'i' } });
        res.render('search', { books, searchQuery });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    viewBook, viewCreateBook, createBook, viewUpdateBook, updateBook, deleteBook, sortBookPrice, searchBookName
}