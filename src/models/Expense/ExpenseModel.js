

const mongoose = require('mongoose') 

const expenseSchema = new mongoose.Schema({
    userEmail: {type:String},
    expenseTypeId: {type:mongoose.Schema.Types.ObjectId},
    amount: {type:Number},
    details: {type:String},
    createdDate: {type:Date, default: Date.now()}
},{versionKey: false}
)

const ExpenseModel = mongoose.model('expenses',expenseSchema) 
module.exports = ExpenseModel