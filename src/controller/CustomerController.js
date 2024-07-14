const { default: mongoose } = require("mongoose")
const AssociateVerificationService = require("../Services/Common/AssociateVerification")
const CreateService = require("../Services/Common/CreateService")
const DeleteService = require("../Services/Common/DeleteService")
const DetailsService = require("../Services/Common/DetailsService")
const DropdownService = require("../Services/Common/DropdownService")
const ListService = require("../Services/Common/ListService")
const UpdateService = require("../Services/Common/UpdateService")
const CustomerModel = require("../models/Customer/CustomerModel")
const SalesModel = require("../models/Sales/SalesModel")


//Create Customer
exports.CreateCustomer = async(req,res)=>{
    const result = await CreateService(req,CustomerModel)
    res.status(200).json(result)
}

//Customer details by id
exports.CustomerDetails = async(req,res)=>{
    const result = await DetailsService(req,CustomerModel)
    res.status(200).json(result)
}

//Customer Update
exports.UpdateCustomer = async(req,res)=>{
    const result = await UpdateService(req,CustomerModel)
    res.status(200).json(result)
}

//Customer Dropdown
exports.CustomerDropdown = async(req,res)=>{
    const result = await DropdownService(req,CustomerModel,{_id:1,customerName:1})
    res.status(200).json(result)
}

//Customer List
exports.CustomerList = async(req,res)=>{
    let searchRegex = {"$regex": req.params.search, $options: 'i'}
    let array = [{customerName:searchRegex},{email:searchRegex},{phoneNumber:searchRegex},{address:searchRegex}]
    const result = await ListService(req,CustomerModel,array)
    res.status(200).json(result)
}

//Customer Delete
exports.DeleteCustomer = async(req,res)=>{
    let deleteId = req.params.id
    const ObjectId = mongoose.Types.ObjectId

    let checkAssociation = await AssociateVerificationService({customerId:new ObjectId(deleteId)},SalesModel)
    if(checkAssociation){
        return res.status(200).json({status:'Associated',data:checkAssociation, message:'Customer is associated with sales'})
    }
    else{
        let result = await DeleteService(req,CustomerModel)
        res.status(200).json(result)
    }
}