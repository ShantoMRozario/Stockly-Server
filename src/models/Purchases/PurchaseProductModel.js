
const mongoose  = require("mongoose");

const purchaseProductSchema = new mongoose.Schema({
    userEmail: {type:String},

    purchaseId: {type:mongoose.Schema.Types.ObjectId},
    productId: {type:mongoose.Schema.Types.ObjectId},

    quantity: {type:Number},
    unitPrice: {type:Number},
    total: {type:Number},

    createdDate: {type:Date, default: Date.now()}
},{versionKey: false}
)   

const PurchaseProductModel = mongoose.model('purchaseProducts',purchaseProductSchema)
module.exports = PurchaseProductModel