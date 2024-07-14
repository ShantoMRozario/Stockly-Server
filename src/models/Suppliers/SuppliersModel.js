
const mongoose = require('mongoose')

const supplierSchema = new mongoose.Schema({
    userEmail: {type:String},
    supplierName: {type:String},
    phoneNumber: {type:String,unique: true},
    email: {type:String},
    address: {type:String},
    createdDate: {type:Date, default: Date.now()}
},{versionKey: false}
)

const SupplierModel = mongoose.model('suppliers',supplierSchema)
module.exports = SupplierModel