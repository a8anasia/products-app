const mongoose = require('mongoose')

const Schema = mongoose.Schema

let productSchema = new Schema({
    product: {type : String, required: true},
    cost: {type : number,required: true },
    description: {type : String, required: true},
    quantity: {type : number,required: true },
}, {
    collation: 'products',
    timestamps: true
})

module.exports = mongoose.model('Product', productSchema)