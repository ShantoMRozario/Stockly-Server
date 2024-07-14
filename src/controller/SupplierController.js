const CreateService = require("../Services/Common/CreateService")
const DeleteService = require("../Services/Common/DeleteService")
const DetailsService = require("../Services/Common/DetailsService")
const DropdownService = require("../Services/Common/DropdownService")
const ListService = require("../Services/Common/ListService")
const UpdateService = require("../Services/Common/UpdateService")
const SupplierModel = require("../models/Suppliers/SuppliersModel")
const PurchaseModel = require("../models/Purchases/PurchaseModel")
const AssociateVerificationService = require("../Services/Common/AssociateVerification")
const { default: mongoose } = require("mongoose")


//Create Supplier
exports.CreateSupplier = async(req,res)=>{
    const result = await CreateService(req,SupplierModel)
    res.status(200).json(result)
}

//Supplier details by id
exports.SupplierDetails = async(req,res)=>{
    const result = await DetailsService(req,SupplierModel)
    res.status(200).json(result)
}

//Supplier Update
exports.UpdateSupplier = async(req,res)=>{
    const result = await UpdateService(req,SupplierModel)
    res.status(200).json(result)
}

//Supplier Dropdown
exports.SupplierDropdown = async(req,res)=>{
    const result = await DropdownService(req,SupplierModel,{_id:1,supplierName:1})
    res.status(200).json(result)
}

//Supplier List
exports.SupplierList = async(req,res)=>{
    let searchRegex = {"$regex": req.params.search, $options: 'i'}
    let array = [{supplierName:searchRegex},{email:searchRegex},{phoneNumber:searchRegex},{address:searchRegex}]
    const result = await ListService(req,SupplierModel,array)
    res.status(200).json(result)
}


//Supplier Delete
exports.DeleteSupplier = async(req,res)=>{
    let deleteId = req.params.id
    const ObjectId = mongoose.Types.ObjectId

    let checkAssociation = await AssociateVerificationService({supplierId:new ObjectId(deleteId)},PurchaseModel)

    if(checkAssociation){
        return res.status(200).json({status:'Associated',data:checkAssociation, message:'Supplier is associated with purchase'})
    }
    else{
        let result = await DeleteService(req,SupplierModel)
        res.status(200).json(result)
    }
}