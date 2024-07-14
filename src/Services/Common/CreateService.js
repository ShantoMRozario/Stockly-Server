
const CreateService = async (Request,dataModel)=>{
    try{
        let body = Request.body
        body.userEmail = Request.headers.email

        let data = await dataModel.create(body)

        return {status:'Success', data:data}
    }
    catch(error){
        return {status:'Failed', data:error, message:error.message}    
    }
}

module.exports = CreateService