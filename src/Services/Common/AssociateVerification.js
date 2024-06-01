
const AssociateVerificationService = async (query,associateModel)=>{
    try{
        let data = await associateModel.aggregate([
            {$match:query}
        ])
        return data.length > 0 ? true : false
    }
    catch(error){
        return {status:'Failed', data:error.message}
    }
}

module.exports = AssociateVerificationService