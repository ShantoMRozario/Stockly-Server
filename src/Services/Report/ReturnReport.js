const ReturnProductModel = require("../../models/Returns/ReturnProductModel")


const ReturnReportService = async(req)=>{
    try{
        let userEmail = req.headers.email 
        let fromDate = req.body.fromDate
        let toDate = req.body.toDate

        let data = await ReturnProductModel.aggregate([
            {$match:{userEmail:userEmail,createdDate:{$gte:new Date(fromDate),$lte: new Date(toDate)}}},

            {
                $facet:{
                    total:[{$group:{_id:0,totalAmount:{$sum:"$total"}}}],
                    data:[
                        {$lookup:{from:'products',localField:'productId',foreignField:'_id',as:'productData'}},
                        {$unwind:"$productData"},
                        {$lookup:{from:'brands',localField:'productData.brandId',foreignField:'_id',as:'brandData'}},
                        {$lookup:{from:'categories',localField:'productData.categoryId',foreignField:'_id',as:'categoryData'}},
                    ]
                }
            }
        ])
        return {status:'Success',data:data}
    }
    catch(error){
        return {status:'Failed',data:error.message}
    }
}

module.exports = ReturnReportService 