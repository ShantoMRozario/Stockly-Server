const mongoose  = require("mongoose")

const ProductFullPage = async (Request,dataModel)=>{
    try{
        let id = Request.params.id
        let email = Request.headers.email
        const objectId = mongoose.Types.ObjectId

        let query = {}
        query['_id'] = new objectId(id)
        query['userEmail'] = email

        let data = await dataModel.aggregate(
            [
                {$match:query},
                {
                    $lookup: {
                        from: 'brands', // The name of the brands collection
                        localField: 'brandId', // The field in the products collection that references the brand
                        foreignField: '_id', // The field in the brands collection that is referenced
                        as: 'brandData' // The name of the array field to add to the result
                    }
                },
                {
                    $unwind: '$brandData' // Unwind the array to include the brand data directly
                },
                {
                    $lookup: {
                        from: 'categories', // The name of the brands collection
                        localField: 'categoryId', // The field in the products collection that references the brand
                        foreignField: '_id', // The field in the brands collection that is referenced
                        as: 'categoryData' // The name of the array field to add to the result
                    }
                },
                {
                    $unwind: '$categoryData' // Unwind the array to include the brand data directly
                },
            ]
        )

        return {status:'Success', data:data, message:'success'}
    }
    catch(error){
        return {status:'Failed', data:error, message:error.message}
    }
}

module.exports = ProductFullPage