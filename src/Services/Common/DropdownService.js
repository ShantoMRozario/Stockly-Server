
const DropdownService = async (Request,dataModel, projection)=>{
    try{
        let userEmail = Request.headers.email
        let data = await dataModel.aggregate(
            [
                {$match:{userEmail:userEmail}},
                {$project:projection}
            ]
        )
        return {status:'Success', data:data}
    }
    catch(error){
        return {status:'Failed', data:error.message}
    }
}

module.exports = DropdownService