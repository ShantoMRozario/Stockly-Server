

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose  = require("mongoose")
const multer = require('multer')
const bodyParser = require('body-parser')
const  route  = require('./src/routes/api')
const { default: rateLimit } = require('express-rate-limit')

//Limit REQUESTS
app.use(
    rateLimit({
        // one hour
        windowMs: 1000 * 60 * 60,
        max: 1000 // limit each IP to 1000 requests per windowMs
    })
)

app.use(cors())

app.use(bodyParser.json())

//mongodb connection
const options = {user:'martin',pass:'martin123',dbName:'Stockly'}
const uri = `mongodb+srv://${options.user}:${options.pass}@mycluster.wjniiuj.mongodb.net/${options.dbName}?retryWrites=true&w=majority`
mongoose.connect(uri,options)
.then(()=>{
    console.log('Database connected')
})
.catch((error)=>{
    console.log(error)
})

app.use('/api',route)

app.use('*',(req,res)=>{
    res.status(404).json({message:'not found'})
})


module.exports = app 


//!  Live Server => https://stockly-server.onrender.com