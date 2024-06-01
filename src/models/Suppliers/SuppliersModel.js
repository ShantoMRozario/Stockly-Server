
const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    userEmail: {type:String},
    supplierName: {type:String},
    phoneNumber: {type:String,unique: true},
    email: {type:String},
    address: {type:String},
    createdDate: {type:Date, default: Date.now()}
},{versionKey: false}
)

const SupplierModel = mongoose.model('suppliers',customerSchema)
module.exports = SupplierModel