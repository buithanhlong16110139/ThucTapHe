const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const Schema = mongoose.Schema
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
    p_loai: [String],
    keyword: [String]
})
module.exports = mongoose.model('products', productSchema);