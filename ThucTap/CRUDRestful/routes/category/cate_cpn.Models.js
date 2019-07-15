const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const Schema = mongoose.Schema
const categoryCompanySchema = Schema({
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'categories'
    },
    companyId: {
        type: Schema.Types.ObjectId,
        ref: 'companies'
    }
})
module.exports = mongoose.model('categoryCompanies', categoryCompanySchema);