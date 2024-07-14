
const  bycrypt = require('bcrypt')

const UserCreateService = async (Request,dataModel)=>{

    try{
        const body = Request.body

        //Hash Password
        const hashedPassword = await bycrypt.hash(body.password,10)
        body.password = hashedPassword

        //Create user with hashed password
        const data = await dataModel.create(body)
        return {status:'Success', data:data}

    }

    catch(error){
        return {status:'Failed', data:error, message:error.message}
    }
}   

module.exports = UserCreateService