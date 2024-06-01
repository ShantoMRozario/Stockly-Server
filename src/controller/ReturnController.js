const parentModel = require("../models/Returns/ReturnModel")
const childModel = require("../models/Returns/ReturnProductModel")
const CreateParentChildrenService = require("../Services/Common/CreateParentChildrenService")
const DeleteParentChildService = require("../Services/Common/DeleteParentChildService")
const ListOneJoinService = require("../Services/Common/ListOneJoinService")

//Create Sales
exports.CreateReturn = async (req, res) => {
    const result = await CreateParentChildrenService(req,parentModel,childModel,'returnId')
    res.status(200).json(result)
}
//Sales List
exports.ReturnList = async (req, res) => {

    let searchRegex = {"$regex": req.params.search, $options: 'i'}
    
    let JoinStageOne = {$lookup:{from:'customers',localField:'customerId',foreignField:'_id',as:'customerData'}}
    let array = [{'customerData.customerName':searchRegex},{'customerData.phoneNumber':searchRegex},{'customerData.email':searchRegex},{'customerData.address':searchRegex}]

    const result = await ListOneJoinService(req,parentModel,array,JoinStageOne)
    res.status(200).json(result)

}
// Sales Delete 
exports.ReturnDelete = async (req, res) => {
    const result = await DeleteParentChildService(req, parentModel, childModel, 'returnId') 
    res.status(200).json(result)
}