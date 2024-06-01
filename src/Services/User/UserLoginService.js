
const CreateToken = require("../../utility/CreateToken")
const bycrpt = require('bcrypt')

const UserLoginService = async (Request,dataModel)=>{
    try{
        const {email,password} = Request.body
        const data = await dataModel.aggregate([ 
            {$match:{email:email}},
            {$project:{password:1,email:1}}

        ])
        if(data.length === 0){
            return {status:'Failed', data:'User Does Not Exist'}
        }
        else{
            const validPassword = await bycrpt.compare(password, data[0].password)
            if(!validPassword){
                return {status:'Failed', data:'Invalid Password'}
            }
            else{
                const token = await CreateToken(email)
                const userData = await dataModel.aggregate(
                    [
                        {$match:{email:email}},
                        {$project:{password:0}}
                    ]
                )
                return {status:'Success', data:userData, token:token}
            }
        }
    }

    catch(error){
        return {status:'Failed', data:error.message}
    }
}

module.exports = UserLoginService