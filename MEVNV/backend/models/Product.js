const mongoose = require('mongoose');
const Schema = mongoose.Schema

let productSchema = new Schema({
    name: {
        type: String
    },
    detail: {
        type: String
    },
    price: {
        type: Number
    },
    qty: {
        type: Number
    }
},{
    collection: 'product'
})

module.exports = mongoose.model('Product', productSchema);