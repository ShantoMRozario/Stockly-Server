const ReturnModel = require("../../models/Returns/ReturnModel")



const ReturnSummaryService = async(req)=>{
    try{
        let userEmail = req.headers.email
        let data = await ReturnModel.aggregate([
            {$match:{userEmail:userEmail}},
            {
                $facet:{
                    total:[{$group:{_id:0, totalAmount:{$sum:"$grandTotal"}}}],
                    last30Days:[{
                        $group:{
                            _id :{ $dateToString:{format: "%d-%m-%Y", date: "$createdDate"}},
                            Total:{$sum:"$grandTotal"}
                        }
                    },
                    {$sort:{_id: -1}},
                    {$limit:30}
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

module.exports = ReturnSummaryService