
const UpdateService = async (Request,dataModel)=>{
    try{

        let id = Request.params.id
        let email = Request.headers.email
        let body = Request.body

        let data = await dataModel.updateOne({_id:id,userEmail:email},body)

        return {status:'Success', data:data}
    }

    catch(error){
        return {status:'Failed', data:error.message}
    }
}

module.exports = UpdateService