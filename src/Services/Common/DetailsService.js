const mongoose  = require("mongoose")

const DetailsService = async (Request,dataModel)=>{
    try{
        let id = Request.params.id
        let email = Request.headers.email
        const objectId = mongoose.Types.ObjectId

        let query = {}
        query['_id'] = new objectId(id)
        query['userEmail'] = email

        let data = await dataModel.aggregate(
            [
                {$match:query}
            ]
        )

        return {status:'Success', data:data}
    }
    catch(error){
        return {status:'Failed', data:error.message}
    }
}

module.exports = DetailsService