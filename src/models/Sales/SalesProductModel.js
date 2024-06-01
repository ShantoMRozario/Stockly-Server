
const mongoose  = require("mongoose");

const salesProductSchema = new mongoose.Schema({
    userEmail: {type:String},

    salesId: {type:mongoose.Schema.Types.ObjectId},
    productId: {type:mongoose.Schema.Types.ObjectId},

    quantity: {type:Number},
    unitPrice: {type:Number},
    total: {type:Number},

    createdDate: {type:Date, default: Date.now()}
},{versionKey: false}
)   

const SalesProductModel = mongoose.model('salesProducts',salesProductSchema)
module.exports = SalesProductModel