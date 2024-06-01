
const mongoose = require('mongoose')

const DeleteParentChildService = async (request, parentModel, childModel, joinPopertyname) => {
    
    //Start a Mongoose Transaction session
    const session = await mongoose.startSession()

    try{

        // Start a transaction within the session
       await session.startTransaction()

       //extract the id from the request parameters and userEmail from the request headers
       let deleteId = request.params.id
       let userEmail = request.headers.email

       //create the query object
       let childQuery = {}

       //set the parent reference in the child query to the delete id
       childQuery[joinPopertyname] = deleteId
       //add user email to ensure the query specific to the user
       childQuery.userEmail = userEmail

       //create parent query object
       let parentQuery = {}

       // set the parent document id in the query to the delete id
       parentQuery['_id'] = deleteId

       //add user email to ensure the query specific to the user
       parentQuery.userEmail = userEmail

       //delete the Child document-first database operation
       let childDelete = await childModel.deleteMany(childQuery).session(session)

       //delete the parent document-second database operation
       let parentDelete = await parentModel.deleteOne(parentQuery).session(session)

       //commit the transaction
       await session.commitTransaction()

       //end the session    
       session.endSession()

       //return the results
       return {status:'Success', parent:parentDelete, child:childDelete}
    }
    catch(error){
        //abort the transaction
        await session.abortTransaction()
        //end the session
        session.endSession()
        //return the error
        return {status:'Failed', data:error.message}
    }
}

module.exports = DeleteParentChildService