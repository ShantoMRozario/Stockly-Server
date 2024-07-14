const mongoose = require('mongoose') 

const brandSchema = new mongoose.Schema({
    userEmail: {type:String},
    name: {type:String,unique: true},
    createdDate: {type:Date, default: Date.now()}
},{versionKey: false}
)

const BrandsModel = mongoose.model('brands',brandSchema) 
module.exports = BrandsModel