
const CreateService = require("../Services/Common/CreateService")
const DeleteService = require("../Services/Common/DeleteService")
const DetailsService = require("../Services/Common/DetailsService")
const ListOneJoinService = require("../Services/Common/ListOneJoinService")
const UpdateService = require("../Services/Common/UpdateService")
const ExpenseModel = require("../models/Expense/ExpenseModel")

//Create Expense
exports.CreateExpense = async(req,res)=>{
    let result = await CreateService(req,ExpenseModel)
    res.status(200).json(result)
}

//Expense Details
exports.ExpenseDetails = async(req,res)=>{
    const result = await DetailsService(req,ExpenseModel)
    res.status(200).json(result)
}

//Update Expense
exports.UpdateExpense = async(req,res)=>{
    const result = await UpdateService(req,ExpenseModel)
    res.status(200).json(result)
}

//Expense List
exports.ExpenseDetailsList = async(req,res)=>{
    let searchRegex = {"$regex": req.params.search, $options: 'i'}
    
    let JoinStageOne = {$lookup:{from:'expensetypes',localField:'expenseTypeId',foreignField:'_id',as:'expenseTypeData'}}
    let array = [{amount:searchRegex},{details:searchRegex},{'expenseData.name':searchRegex}]

    const result = await ListOneJoinService(req,ExpenseModel,array,JoinStageOne)
    res.status(200).json(result)
}

//Expense Delete
exports.DeleteExpense = async(req,res)=>{
  
    let result = await DeleteService(req,ExpenseModel)
    res.status(200).json(result)
}
