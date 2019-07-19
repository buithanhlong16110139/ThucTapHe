// const mongoose = require('mongoose')
// mongoose.Promise = global.Promise
// const Schema = mongoose.Schema
import mongoose from 'mongoose';
mongoose.Promise = global.Promise
const Schema = mongoose.Schema

const userSchema = new Schema({
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
export default mongoose.model('users', userSchema);
//module.exports = mongoose.model('users', userSchema);