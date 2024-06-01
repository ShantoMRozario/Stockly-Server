// Search and pagination service

const ListOneJoinService = async (Request,dataModel, Array, JoinStageOne)=>{
    try{
        let pageNumber = Number(Request.params.pageNumber) //extract page number from request
        let perPage = Number(Request.params.perPage) //extract perPage from request
        let search = Request.params.search //extract search from request
        let userEmail = Request.headers.email
    
        let skip = (pageNumber - 1) * perPage //calculate skip
        let data
    
        if (search !== 'null'){
            let query = {$or:Array} //search query
            data = await dataModel.aggregate(
                [
                    {$match:{userEmail:userEmail}},
                    JoinStageOne,
                    {$match:query},
                    {$facet:{
                        total:[{$count:'total'}],
                        data:[{$skip:skip},{$limit:perPage}]
                    }}
                ]
            )
        }
        else{
            data = await dataModel.aggregate(
                [
                    {$match:{userEmail:userEmail}},
                    JoinStageOne,
                    {$facet:{
                        total:[{$count:'total'}],
                        data:[{$skip:skip},{$limit:perPage}]
                    }}
                ]
            )
        }
    
        return {status:'Success', data:data}
    }

    catch(error){
        return {status:'Failed', data:error.message}    
    }
}

module.exports = ListOneJoinService

