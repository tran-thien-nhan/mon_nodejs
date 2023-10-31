const { Schema, default: mongoose } = require("mongoose");
const productSchema = new Schema({
    name: {
        type: String,
        require: [true, 'Name is require'],
    },
    price: {
        type: Number,
        require: [true, 'Price is require'],
        min: [2, "min is 2"],
        max: [2000, "min is 2000"]
    },
    image: {
        type: String,
        validator: function (v) {
            return /\.(jpq|jpeg|png)$/i.test(v);
        },
        require: [true, 'image is require'],
    },
});
const Product = mongoose.model('Product', productSchema);
module.exports = Product;