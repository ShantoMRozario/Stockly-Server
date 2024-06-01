
const ExpenseModel = require("../../models/Expense/ExpenseModel")

const ExpenseReportService = async(req)=>{
    try{
        let userEmail = req.headers.email 
        let fromDate = req.body.fromDate
        let toDate = req.body.toDate

        let data = await ExpenseModel.aggregate([
            {$match:{userEmail:userEmail,createdDate:{$gte:new Date(fromDate),$lte: new Date(toDate)}}},

            {
                $facet:{
                    total:[{$group:{_id:0,totalAmount:{$sum:"$amount"}}}],
                    data:[{$lookup:{from:'expensetypes',localField:'expenseTypeId',foreignField:'_id',as:'expenseTypeData'}}]
                }
            }
        ])
        return {status:'Success',data:data}
    }
    catch(error){
        return {status:'Failed',data:error.message}
    }
}

module.exports = ExpenseReportService