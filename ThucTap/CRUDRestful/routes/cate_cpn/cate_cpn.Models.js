const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const Schema = mongoose.Schema
const catecpnSchema = Schema({
    cate_id: {
        type: Schema.Types.ObjectId,
        ref: 'categories'
    },
    cpn_id: {
        type: Schema.Types.ObjectId,
        ref: 'companies'
    }
})
module.exports = mongoose.model('catecpn', catecpnSchema);