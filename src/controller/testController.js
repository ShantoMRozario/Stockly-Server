

exports.test = (req,res)=>{
    res.status(200).json({
        message:"test Controller"
    })
}

exports.testTwo = (req,res)=>{
    res.status(200).json({
        message:"kaj hoise two"
    })
}