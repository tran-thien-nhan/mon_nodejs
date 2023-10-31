const { Schema, default: mongoose } = require('mongoose');
const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [2, 'min is 2'],
        max: [2000, 'max is 2000']
    },
    image: {
        type: String,
        validate: {
            validator: function (v) {
                return /\.(jpg|jpeg|png)$/i.test(v);
            },
            message: (props) => `${props.value} allow type: jpq, jpeg, png`
        },
        required: [true, 'Image is required']
    },
});
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
