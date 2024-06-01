const ExpenseSummaryService = require("../Services/Summary/ExpenseSummary")
const PurchaseSummaryService = require("../Services/Summary/PurchaseSummary")
const ReturnSummaryService = require("../Services/Summary/ReturnSummary")
const SalesSummaryService = require("../Services/Summary/SaleSummary")
const ExpenseModel = require("../models/Expense/ExpenseModel")
const PurchaseModel = require("../models/Purchases/PurchaseModel")
const ReturnModel = require("../models/Returns/ReturnModel")
const SalesModel = require("../models/Sales/SalesModel")

//Expense Summary
exports.ExpenseSummary = async(req,res)=>{
    const result = await ExpenseSummaryService(req,ExpenseModel)
    res.status(200).json(result)
}

//Purchase Summary
exports.PurchaseSummary = async(req,res)=>{
    const result = await PurchaseSummaryService(req,PurchaseModel)
    res.status(200).json(result)
}

//Sales Summary
exports.SalesSummary = async(req,res)=>{
    const result = await SalesSummaryService(req,SalesModel)
    res.status(200).json(result)
}

//Return Summary
exports.ReturnSummary = async(req,res)=>{
    const result = await ReturnSummaryService(req,ReturnModel)
    res.status(200).json(result)
}

