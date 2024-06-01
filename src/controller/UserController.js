const UserModel = require("../models/User/UsersModel")
const OtpModel = require("../models/User/OtpModel")
const OtpVerifyService = require("../Services/User/OtpVerifyService")
const ResetPassService = require("../Services/User/ResetPassService")
const UserCreateService = require("../Services/User/UserCreateService")
const UserDetailsService = require("../Services/User/UserDetailsService")
const UserEmailVerifyService = require("../Services/User/UserEmailVerifyService")
const UserLoginService = require("../Services/User/UserLoginService")
const UserUpdateService = require("../Services/User/UserUpdateService")


//Registration
exports.Registration = async(req,res)=>{
    const result = await UserCreateService(req,UserModel)
    res.status(200).json(result)
}

//Login
exports.Login = async(req,res)=>{
    const result = await UserLoginService(req,UserModel)
    res.status(200).json(result)
}

//User Details
exports.UserDetails = async(req,res)=>{
    const result = await UserDetailsService (req,UserModel)
    res.status(200).json(result)
}

//Email Verify
exports.EmailVerify = async(req,res)=>{
    const result = await UserEmailVerifyService(req,UserModel)
    res.status(200).json(result)
}

//otp verify

exports.OtpVerify = async(req,res)=>{
    const result = await OtpVerifyService(req,OtpModel)
    res.status(200).json(result)
}

//Reset Password
exports.ResetPassword = async(req,res)=>{
    const result = await ResetPassService(req,UserModel)
    res.status(200).json(result)
}

//Update User
exports.UpdateUser = async(req,res)=>{
    const result = await UserUpdateService(req,UserModel)
    res.status(200).json(result)
}