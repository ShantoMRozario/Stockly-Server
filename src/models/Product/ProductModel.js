
const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    userEmail: {type:String},

    productName: {type:String},
    unit: {type:String},
    details: {type:String},
    images: [{type:String}],
    categoryId: {type:mongoose.Schema.Types.ObjectId},
    brandId: {type:mongoose.Schema.Types.ObjectId},

    createdDate: {type:Date, default: Date.now()}
},{versionKey: false})

const ProductModel = mongoose.model('products',productSchema)
module.exports = ProductModel