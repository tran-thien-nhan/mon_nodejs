const { Schema, default: mongoose } = require('mongoose');
const bookSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Title is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [2, 'min is 2'],
        max: [2000, 'max is 2000']
    },
    quantity: {
        type: Number,
        required: [true, 'quantity is required'],
        min: [1, 'min is 1'],
        max: [100, 'max is 100']
    }
});
const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
