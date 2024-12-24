const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    uin: {type: Number, required: true},
    productName: {type:String, required: true},
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;