const mongoose = require("mongoose")
const CreateService = require("../Services/Common/CreateService")
const DeleteService = require("../Services/Common/DeleteService")
const DetailsService = require("../Services/Common/DetailsService")
const DropdownService = require("../Services/Common/DropdownService")
const ListService = require("../Services/Common/ListService")
const UpdateService = require("../Services/Common/UpdateService")
const BrandModel = require("../models/Brands/BrandsModel")
const AssociateVerificationService = require("../Services/Common/AssociateVerification")
const ProductModel = require("../models/Product/ProductModel")


//Create Brands
exports.CreateBrands = async(req,res)=>{
    const result = await CreateService(req,BrandModel)
    res.status(200).json(result)
}

//Brand Details
exports.BrandDetails = async(req,res)=>{
    const result = await DetailsService(req,BrandModel)
    res.status(200).json(result)
}

//Update Brand
exports.UpdateBrand = async(req,res)=>{
    const result = await UpdateService(req,BrandModel)
    res.status(200).json(result)
}


//Brand Dropdown
exports.BrandDropdown = async(req,res)=>{
    const result = await DropdownService(req,BrandModel,{_id:1,name:1})
    res.status(200).json(result)
}

//Brand List
exports.BrandList = async(req,res)=>{
    let searchRegex = {"$regex": req.params.search, $options: 'i'}
    let array = [{name:searchRegex}]
    const result = await ListService(req,BrandModel,array)
    res.status(200).json(result)
}

//Delete Brand
const mongodbObjId = mongoose.Types.ObjectId

exports.DeleteBrand = async(req,res)=>{

    let deleteId = req.params.id

    //check Mongodb id validation
    const objId = mongodbObjId.isValid(deleteId)? new mongodbObjId(deleteId) : null

    if(!objId){
        return res.status(200).json({status:'Failed',data:'Invalid Brand Id'})
    }

    //Check Association before deleting
    let checkAssociation = await AssociateVerificationService({brandId:objId},ProductModel)

    if(checkAssociation){
        return res.status(200).json({status:'Failed',data:checkAssociation, message:'Brand is associated with product'})
    }
    else{
        let result = await DeleteService(req,BrandModel)
        res.status(200).json(result)
    }
}