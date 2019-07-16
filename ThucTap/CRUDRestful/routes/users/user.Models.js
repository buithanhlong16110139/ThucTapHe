const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const Schema = mongoose.Schema
const userSchema = Schema({
    fullName: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    address: String,
    username: String,
    password: String,
    age: Number
})
module.exports = mongoose.model('users', userSchema);