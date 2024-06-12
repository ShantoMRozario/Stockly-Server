
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {type:String,required: true,unique: true},
    password: {type:String,required: true},
    firstName: {type:String, default: 'New'},
    lastName: {type:String,default: 'User'},
    profiePic: {type:String,default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'},
    createdDate: {type:Date, default: Date.now()}
},
{versionKey: false}
)

const UserModel = mongoose.model('users',userSchema)
module.exports = UserModel
