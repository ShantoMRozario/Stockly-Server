
const OtpVerifyService = async (Request,dataModel)=>{
    try{
        let email = Request.params.email
        let otp = Request.params.otp
        let otpStatus = 0
        let updatedOtpStatus = 1
        
        let otpCheck = await dataModel.aggregate(
            [
                {$match:{email:email,otp:otp}},
                {$count:'total'} 
            ]
        )
        if(otpCheck.length > 0){
            let updateOtp = await dataModel.updateOne({email:email,otp:otp},{email:email,otp:otp,status:updatedOtpStatus})

            return {status:'Success', data:updateOtp, message:'OTP Verified'}
        }
        else{
            return {status:'Failed', data:'Invalid OTP'}
        }

    }
    catch(error){
        return {status:'Failed', data:error.message}
    }
}

module.exports = OtpVerifyService