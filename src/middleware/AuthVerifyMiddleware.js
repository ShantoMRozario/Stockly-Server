
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    let token = req.headers['token']
    jwt.verify(token,'secretkey', (err, decoded) => {
        if(err){
            return res.status(401).json({status:'Failed', message:'Unauthorized'})
        }
        else{
            let email = decoded['data'] 
            req.headers.email = email
            next()
        }
    })
}
