
const SalesModel = require("../../models/Sales/SalesModel")


const SalesSummaryService = async(req)=>{
    try{
        let userEmail = req.headers.email
        let data = await SalesModel.aggregate([
            {$match:{userEmail:userEmail}},
            {
                $facet:{
                    total:[{$group:{_id:0, totalAmount:{$sum:"$total"}}}],
                    last30Days:[{
                        $group:{
                            _id :{ $dateToString:{format: "%d-%m-%Y", date: "$createdDate"}},
                            totalAmount:{$sum:"$total"}
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

module.exports = SalesSummaryService