
//For Single Image
const cloudinary = require("../utility/CloudinaryConfig")
const productModel = require("../models/Product/ProductModel")
const multer = require("multer")
const multerS3 = require('multer-s3');
const DetailsService = require("../Services/Common/DetailsService")
const DropdownService = require("../Services/Common/DropdownService")
const ListTwoJoinService = require("../Services/Common/ListTwoJoinService")

//Multer Configuration
// const upload = multer({dest:'uploads/'}).single('image')

// exports.CreateProduct = async(req,res)=>{
//     try{
//         //Handle Form Data Using Multer
//         upload(req,res,async(err)=>{
//             if(err){
//                 res.status(400).json({message:err.message})
//             }

//             //Extract Form data & files
//             const body = req.body
//             const image = req.file

//             //Upload image to cloudinary
//             const result = await cloudinary.uploader.upload(image.path)

//             //Create Product with Cloudinary image URL
//             let email = req.headers.email
//             const product = await productModel.create({
//                 userEmail:email,
//                 productName:body.productName,
//                 unit:body.unit,
//                 details:body.details,
//                 image:[result.secure_url], //store image URL in an array
//                 categoryId:body.categoryId,
//                 brandId:body.brandId
//             })

//             res.status(200).json({status:"Success",message:"Product Created",data:product})
//         })
//     }
//     catch(error){
//         res.status(500).json({status:"Failed",message:error.message,data:error})
//     }
// }

//Create Product

//For Multiple Image

//Multer Configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb(new Error ('Please upload only images', 400),false)
    }
}
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits:{
        //2mb file size limit
        fileSize: 1024 * 1024 * 2
    } 
}).array('images',5) //limit to 5 images


exports.CreateProduct = async(req,res)=>{
    try{
        //Handle Form Data Using Multer
        upload(req,res,async(err)=>{
            if(err){
              return res.status(400).json({status:"Failed",message:err.message, data:err})
            }

            //Extract Form data & files
            const body = req.body
            const images = req.files.map(file => file.path)

            //Upload image to cloudinary with folder
            const promises = images.map(imagePath=>{
                return cloudinary.uploader.upload(imagePath,{
                    folder:"productsImages" //folder name
                })
            })
            const uploadedImages = await Promise.all(promises)

            //Create Product with Cloudinary image URL
            let email = req.headers.email
            const product = await productModel.create({
                userEmail:email,
                productName:body.productName,
                unit:body.unit,
                details:body.details,
                images:uploadedImages.map(img=>img.secure_url), //store image URL in an array
                categoryId:body.categoryId,
                brandId:body.brandId
            })

            return res.status(200).json({status:"Success",message:"Product Created",data:product})
        })
    }
    catch(error){
        res.status(500).json({status:"Failed",message:error.message,data:error})
    }
}

//ProductDetails
exports.ProductDetails = async(req,res)=>{
    let result = await DetailsService(req,productModel)
    res.status(200).json(result)
}


//Product Update
exports.ProductUpdate = async(req,res)=>{
    try{
        upload(req,res,async(err)=>{
            if(err){
                res.status(400).json({status:"Failed",message:err.message, data:err})
            }
    
            //Extract Form data & files
            const body = req.body
            const images = req.files.map(file => file.path)

            let userEmail = req.headers.email
            let id = req.params.id
             
            // Find the existing product by id and userEmail
            let product = await productModel.findOne({userEmail:userEmail, _id:id})
            if(!product){
                return res.status(404).json({status:"Failed", message:"Product not found", data:product})
            }
            //delete old images from cloudinary
            if(product.images && product.images.length > 0){
                const deletePromises = product.images.map(imageUrl=>{
                    //extract public image from Url
                    const publicId = imageUrl.split('/').pop().split('.')[0]
                    return cloudinary.uploader.destroy(`productsImages/${publicId}`)
                })
                await Promise.all(deletePromises)
            }
    
            //Upload new image to cloudinary 
            const uploadPromises = images.map(imagePath=>{
                return cloudinary.uploader.upload(imagePath,{
                    folder:"productsImages" //folder name
                }) 
            })
            const uploadedImages = await Promise.all(uploadPromises)
    
            //Update Product with new image URL
            const updateData = {
                productName:body.productName,
                unit:body.unit,
                details:body.details,
                images:uploadedImages.map(img=>img.secure_url), //store image URL in an array
                categoryId:body.categoryId,
                brandId:body.brandId
            }
    
            await productModel.updateOne({userEmail:userEmail, _id:id},updateData)
    
            return res.status(200).json({status:"Success",message:"Product Updated",data:updateData})
        })
    }
    catch(error){
        res.status(500).json({status:"Failed",message:error.message,data:error})
    }
}

//product dropdown
exports.ProductDropdown = async(req,res)=>{
    let result = await DropdownService(req,productModel,{_id:1,productName:1})  
    res.status(200).json(result)
}

//Product List
exports.ProductDetailsList = async(req,res)=>{
    let searchRegex = {"$regex": req.params.search, $options: 'i'}
    
    let JoinStageOne = {$lookup:{from:'brands',localField:'brandId',foreignField:'_id',as:'brandData'}}
    let JoinStageTwo = {$lookup:{from:'categories',localField:'categoryId',foreignField:'_id',as:'categoryData'}}
    let array = [{productName:searchRegex},{unit:searchRegex},{details:searchRegex},{'brandData.name':searchRegex},{'categoryData.name':searchRegex}]

    const result = await ListTwoJoinService(req,productModel,array,JoinStageOne,JoinStageTwo)
    res.status(200).json(result)
}

