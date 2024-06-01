const parentModel = require("../models/Purchases/PurchaseModel")
const childModel = require("../models/Purchases/PurchaseProductModel")
const CreateParentChildrenService = require("../Services/Common/CreateParentChildrenService")
const DeleteParentChildService = require("../Services/Common/DeleteParentChildService")
const ListOneJoinService = require("../Services/Common/ListOneJoinService")

//Create Purchase
exports.CreatePurchase = async (req, res) => {
    const result = await CreateParentChildrenService(req,parentModel,childModel,'purchaseId')
    res.status(200).json(result)
}

//Purchase List
exports.PurchaseList = async (req, res) => {

    let searchRegex = {"$regex": req.params.search, $options: 'i'}
    
    let JoinStageOne = {$lookup:{from:'suppliers',localField:'supplierId',foreignField:'_id',as:'supplierData'}}
    let array = [{'supplierData.supplierName':searchRegex},{'supplierData.phoneNumber':searchRegex},{'supplierData.email':searchRegex},{'supplierData.address':searchRegex}]

    const result = await ListOneJoinService(req,parentModel,array,JoinStageOne)
    res.status(200).json(result)

}

exports.PurchaseDelete = async (req, res) => {
    const result = await DeleteParentChildService(req, parentModel, childModel, 'purchaseId') 
    res.status(200).json(result)
}