const parentModel = require("../models/Sales/SalesModel")
const childModel = require("../models/Sales/SalesProductModel")
const CreateParentChildrenService = require("../Services/Common/CreateParentChildrenService")
const DeleteParentChildService = require("../Services/Common/DeleteParentChildService")
const ListOneJoinService = require("../Services/Common/ListOneJoinService")



//Create Sales
exports.CreateSales = async (req, res) => {
    const result = await CreateParentChildrenService(req,parentModel,childModel,'salesId')
    res.status(200).json(result)
}
//Sales List
exports.SalesList = async (req, res) => {

    let searchRegex = {"$regex": req.params.search, $options: 'i'}
    
    let JoinStageOne = {$lookup:{from:'customers',localField:'customerId',foreignField:'_id',as:'customerData'}}
    let array = [{'customerData.customerName':searchRegex},{'customerData.phoneNumber':searchRegex},{'customerData.email':searchRegex},{'customerData.address':searchRegex}]

    const result = await ListOneJoinService(req,parentModel,array,JoinStageOne)
    res.status(200).json(result)

}
// Sales Delete 
exports.SalesDelete = async (req, res) => {
    const result = await DeleteParentChildService(req, parentModel, childModel, 'salesId') 
    res.status(200).json(result)
}