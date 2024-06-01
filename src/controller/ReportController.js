const ExpenseReportService = require("../Services/Report/ExpenseReport")
const PurchaseReportService = require("../Services/Report/PurchaseReport")
const ReturnReportService = require("../Services/Report/ReturnReport")
const SalesReportService = require("../Services/Report/SalesReport")

//Create Expense Report By Date
exports.ExpenseReportByDate = async (req, res) => {
    const result = await ExpenseReportService(req)
    res.status(200).json(result)
}

//Create Purchase Report By date
exports.PurchaseReportByDate = async (req, res) => {
    const result = await PurchaseReportService(req)
    res.status(200).json(result)
}

//Create Sales Report By date
exports.SalesReportByDate = async (req, res) => {
    const result = await SalesReportService(req)
    res.status(200).json(result)
}

//Create Return Report By date
exports.RetunReportByDate = async (req,res) => {
    const result = await ReturnReportService(req)
    res.status(200).json(result)
}