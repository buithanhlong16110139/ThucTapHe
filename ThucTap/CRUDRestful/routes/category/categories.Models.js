const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const Schema = mongoose.Schema
const categorySchema = Schema({
    categoryName: {
        type: String
    }
})
module.exports = mongoose.model('categories', categorySchema);