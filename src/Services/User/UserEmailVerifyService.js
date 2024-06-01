
const OtpModel = require("../../models/User/OtpModel")
const SendEmail = require("../../utility/SendEmail")


const UserEmailVerifyService = async (Request,dataModel)=>{
    try{
        const email = Request.params.email
        
        //Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000) //Generate 6 digit OTP
        
        let userCheck = await dataModel.aggregate(
            [
                {$match:{email:email}},
                {$count:'total'}
            ]
        )
        if(userCheck.length > 0){
            let createOTP = await OtpModel.create({email:email,otp:otp}) //create OTP in DB

            //Send Email
            let sendEmail = await SendEmail(email,"OTP Verification",`Your OTP is ${otp}`)

            return {status:'Success', data:otp, message:'OTP Sent'}
        }
        else{
            return {status:'Failed', data:'User Does Not Exist'}
        }
    }
    catch(error){
        return {status:'Failed', data:error.message}
    }
}

module.exports = UserEmailVerifyService