
const DeleteService = async (Request,dataModel)=>{
    try{
        let id = Request.params.id
        let email = Request.headers.email

        let query = {}
        query['_id'] = id
        query['userEmail'] = email

        let data = await dataModel.deleteMany(query)
        return {status:'Success', data:data}
    }
    catch(error){
        return {status:'Failed', data:error.message}
    }
}

module.exports = DeleteService