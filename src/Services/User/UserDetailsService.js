
const UserDetailsService = async (Request,dataModel)=>{
    try{
        let data = await dataModel.aggregate(
            [
                {$match:{email:Request.headers.email}},
                {$project:{password:0}}
            ]
        )

        return {status:'Success', data:data}
    }

    catch(error){
        return {status:'Failed', data:error.message}
    }
}

module.exports = UserDetailsService 