const mongoose = require("mongoose")
const AssociateVerificationService = require("../Services/Common/AssociateVerification")
const CreateService = require("../Services/Common/CreateService")
const DeleteService = require("../Services/Common/DeleteService")
const DetailsService = require("../Services/Common/DetailsService")
const DropdownService = require("../Services/Common/DropdownService")
const ListService = require("../Services/Common/ListService")
const UpdateService = require("../Services/Common/UpdateService")
const CategoryModel = require("../models/Category/CategoryModel")
const ProductModel = require("../models/Product/ProductModel")


//Create Category
exports.CreateCategory = async(req,res)=>{
    const result = await CreateService(req,CategoryModel)
    res.status(200).json(result)
}

//Category Details
exports.CategoryDetails = async(req,res)=>{
    const result = await DetailsService(req,CategoryModel)
    res.status(200).json(result)
}

//Update Category
exports.UpdateCategory = async(req,res)=>{
    const result = await UpdateService(req,CategoryModel)
    res.status(200).json(result)
}

//Category Dropdown
exports.CategoryDropdown = async(req,res)=>{
    const result = await DropdownService(req,CategoryModel,{_id:1,name:1})
    res.status(200).json(result)
}

//Category List
exports.CategoryList = async(req,res)=>{
    let searchRegex = {"$regex": req.params.search, $options: 'i'}
    let array = [{name:searchRegex}]
    const result = await ListService(req,CategoryModel,array)
    res.status(200).json(result)
}


//Delete Category
const mongodbObjId = mongoose.Types.ObjectId

exports.DeleteCategory = async(req,res)=>{

    let deleteId = req.params.id

    //check Mongodb id validation
    const objId = mongodbObjId.isValid(deleteId)? new mongodbObjId(deleteId) : null

    if(!objId){
        return res.status(200).json({status:'Failed',data:'Invalid Category Id'})
    }

    //Check Association before deleting
    let checkAssociation = await AssociateVerificationService({categoryId:objId},ProductModel)

    if(checkAssociation){
        return res.status(200).json({status:'Failed',data:checkAssociation, message:'Category is associated with product'})
    }
    else{
        let result = await DeleteService(req,CategoryModel)
        res.status(200).json(result)
    }
}