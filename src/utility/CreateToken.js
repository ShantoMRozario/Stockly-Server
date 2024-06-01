
var jwt = require('jsonwebtoken')

const CreateToken = async (data)=>{
    const payload = {
        //30 days
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30), data
    }
    return await jwt.sign(payload,'secretkey');
}

module.exports = CreateToken