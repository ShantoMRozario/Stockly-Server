
const bycrpt = require('bcrypt')
const OtpModel = require("../../models/User/OtpModel")

const ResetPassService = async (Request,dataModel)=>{
    try{
        let email = Request.body.email
        let otp = Request.body.otp
        let updatedOtpStatus = 1
        let newPassword = Request.body.password

        //Hash Password
        let hashedPassword = await bycrpt.hash(newPassword,10)



        let otpCheck = await OtpModel.aggregate(
            [
                {$match:{email:email,otp:otp,status:updatedOtpStatus}},
                {$count:'total'}

            ]
        )

        if(otpCheck.length > 0){
            let updatePassword = await dataModel.updateOne({email:email},{email:email,password:hashedPassword})

            return {status:'Success', data:updatePassword, message:'Password Reset successfully'}
        }
        else{
            return {status:'Failed', data:otpCheck.length, message:'Invalid OTP'}
        }
    }
    catch(error){
        return {status:'Failed', data:error.message}
    }
}

module.exports = ResetPassService