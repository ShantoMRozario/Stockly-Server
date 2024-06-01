
const mongoose = require("mongoose")

const CreateParentChildrenService = async (request, parentModel, childModel, joinParentChild) => {

    //Create a Transaction session
    //Start a Mongoose session
    const session = await mongoose.startSession()

    try{
        // Start a transaction within the session
       await session.startTransaction()

        //Create Parent data.Extract data from request
       const parentPostBody = request.body.parent 

       //Add userEmail to parent post body for tracking
       parentPostBody.userEmail = request.headers.email

       //Create parent data using the model with the session. attempts to create a new parent post or data entry using the Mongoose model and a session
       //this operation is a part of the transaction and will be rolled back if an error occurs
       const parentDataCreation = await parentModel.create([parentPostBody], {session})

       //Create child data.Extract data from request
       const childPostBody = request.body.childs

        //Update each child record with the parent id and userEmail
        //this ensures that each child document references the correct parent document and includes the user information
       childPostBody.forEach(element => {
        // Establish a parent-child relationship between elements
        element[joinParentChild] = parentDataCreation[0]['_id']

        //Add userEmail to child post body for tracking
        element.userEmail = request.headers.email
       });

       //Create child data using the model with the session. attempts to create a new child post or data entry using the Mongoose model and a session
       //this operation is a part of the transaction and will be rolled back if an error occurs
       const childDataCreation = await childModel.insertMany(childPostBody, {session})

       //Commit the transaction if both parent and child data creations are successful
       await session.commitTransaction()

       //End the session after successful transaction
       session.endSession()

       //Return both parent and child data
       return {status:'Success', parentData:parentDataCreation, childData:childDataCreation}

    }
    catch(error){
        //Rollback the transaction if an error occurs
        await session.abortTransaction()
        //End the session after an error
        session.endSession()
        //Return error
        return {status:'Failed', data:error , message:error.message}
    }
}

module.exports = CreateParentChildrenService