const CreateService = require("../Services/Common/CreateService")
const DetailsService = require("../Services/Common/DetailsService")
const DropdownService = require("../Services/Common/DropdownService")
const ListService = require("../Services/Common/ListService")
const UpdateService = require("../Services/Common/UpdateService")
const ExpenseTypeModel = require("../models/Expense/ExpenseTypeModel")


//Create ExpenseType
exports.CreateExpenseType = async(req,res)=>{
    let result = await CreateService(req,ExpenseTypeModel)
    res.status(200).json(result)
}

//ExpenseType Details
exports.ExpenseTypeDetails = async(req,res)=>{
    const result = await DetailsService(req,ExpenseTypeModel)
    res.status(200).json(result)
}

//Update ExpenseType
exports.UpdateExpenseType= async(req,res)=>{
    const result = await UpdateService(req,ExpenseTypeModel)
    res.status(200).json(result)
}

// ExpenseType Dropdown
exports.ExpenseTypeDropdown = async(req,res)=>{
    const result = await DropdownService(req,ExpenseTypeModel,{_id:1,name:1})
    res.status(200).json(result)
}

//ExpenseType List
exports.ExpenseTypeList = async(req,res)=>{
    let searchRegex = {"$regex": req.params.search, $options: 'i'}
    let array = [{name:searchRegex}]
    const result = await ListService(req,ExpenseTypeModel,array)
    res.status(200).json(result)
}

// Delete ExpenseType