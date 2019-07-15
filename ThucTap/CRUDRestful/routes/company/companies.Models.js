const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const Schema = mongoose.Schema
const companySchema = Schema({
    companyName: String,
    companyCode: {
        type: String
    }
})
module.exports = mongoose.model('companies', companySchema);