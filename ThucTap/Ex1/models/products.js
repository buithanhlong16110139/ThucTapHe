const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = Schema({
    name: {
        type: String
    },
    masp: {
        type: String
    },
    gia: {
        type: Number
    },
    p_loai: {
        type: String
    },
    keyword: {
        type: String
    }
})
module.exports = mongoose.model('products', productSchema);