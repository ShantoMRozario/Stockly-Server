const mongoose = require('mongoose') 

const expenseTypeSchema = new mongoose.Schema({
    userEmail: {type:String},
    name: {type:String,unique: true},
    createdDate: {type:Date, default: Date.now()}
},{versionKey: false}
)

const ExpenseTypeModel = mongoose.model('expenseTypes',expenseTypeSchema) 
module.exports = ExpenseTypeModel