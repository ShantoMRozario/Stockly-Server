
const UserUpdateService = async (Request,dataModel)=>{
    try{
        let data = await dataModel.updateOne({email: Request.header.email},Request.body)
        // let data = await dataModel.updateOne({email:Request.headers.email}, {firstName:Request.body.firstName,lastName:Request.body.lastName})

        return {status:'Success', data:data}
    }
    catch(error){
        return {status:'Failed', data:error.message}
    }
}

module.exports = UserUpdateService