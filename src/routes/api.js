

const express = require('express')
const router = express.Router()
const testController = require('../controller/testController')
const UserController = require('../controller/UserController')
const authMiddleware = require('../middleware/AuthVerifyMiddleware') 
const BrandsController  = require('../controller/BrandsController')
const CategoryController = require('../controller/CategoryController')
const CustomerController = require('../controller/CustomerController')
const SupplierController = require('../controller/SupplierController')
const ProductController = require('../controller/ProductController')
const ExpenseTypeController = require('../controller/ExpenseTypeController')
const ExpenseController = require('../controller/ExpenseController')
const PurchaseController = require('../controller/PurchaseController')
const SalesController = require('../controller/SalesController')
const ReturnController = require('../controller/ReturnController')
const ReportController = require('../controller/ReportController')
const SummaryController = require('../controller/SummaryController')

//Test Routes
router.get("/test",testController.test)
router.get("/testTwo",testController.testTwo)

//User Routes
router.post('/registration',UserController.Registration)
router.post('/login',UserController.Login)
router.get('/emailVerify/:email',UserController.EmailVerify)
router.get('/otp-Verify/:email/:otp',UserController.OtpVerify)
router.post('/resetPassword',UserController.ResetPassword)
router.get('/userDetails',authMiddleware,UserController.UserDetails)
router.post('/updateProfile',authMiddleware,UserController.UpdateUser)

//? Brand Routes
//CreateBrands
router.post('/createBrands',authMiddleware,BrandsController.CreateBrands)
//BrandDetails
router.get('/brandDetails/:id',authMiddleware,BrandsController.BrandDetails)
//UpdateBrand
router.post('/updateBrand/:id',authMiddleware,BrandsController.UpdateBrand)
//DeleteBrand
router.get('/deleteBrand/:id',authMiddleware,BrandsController.DeleteBrand)
//BrandDropdown
router.get('/brandDropdown',authMiddleware,BrandsController.BrandDropdown)
//BrandList
router.get('/brandList/:pageNumber/:perPage/:search',authMiddleware,BrandsController.BrandList)

//? Category Routes
//CreateCategory
router.post('/createCategory',authMiddleware,CategoryController.CreateCategory)
//CategoryDetails
router.get('/categoryDetails/:id',authMiddleware,CategoryController.CategoryDetails)
//UpdateCategory
router.post('/updateCategory/:id',authMiddleware,CategoryController.UpdateCategory)
//DeleteCategory
router.get('/deleteCategory/:id',authMiddleware,CategoryController.DeleteCategory)
//CategoryDropdown
router.get('/categoryDropdown',authMiddleware,CategoryController.CategoryDropdown)
//CategoryList
router.get('/categoryList/:pageNumber/:perPage/:search',authMiddleware,CategoryController.CategoryList)

//? Customer Routes
//CreateCustomer
router.post('/createCustomer',authMiddleware,CustomerController.CreateCustomer)
//CustomerDetails
router.get('/customerDetails/:id',authMiddleware,CustomerController.CustomerDetails)
//UpdateCustomer
router.post('/updateCustomer/:id',authMiddleware,CustomerController.UpdateCustomer)
//CustomerDropdown
router.get('/customerDropdown',authMiddleware,CustomerController.CustomerDropdown)
//CustomerList
router.get('/customerList/:pageNumber/:perPage/:search',authMiddleware,CustomerController.CustomerList)
//DeleteCustomer
router.get('/deleteCustomer/:id',authMiddleware,CustomerController.DeleteCustomer)

//? Supplier Routes
//CreateSupplier
router.post('/createSupplier',authMiddleware,SupplierController.CreateSupplier)
// SupplierDetails
router.get('/supplierDetails/:id',authMiddleware,SupplierController.SupplierDetails)
//UpdateSupplier
router.post('/updateSupplier/:id',authMiddleware,SupplierController.UpdateSupplier)
//SupplierDropdown
router.get('/supplierDropdown',authMiddleware,SupplierController.SupplierDropdown)
//SupplierList
router.get('/supplierList/:pageNumber/:perPage/:search',authMiddleware,SupplierController.SupplierList)
//DeleteSupplier
router.get('/deleteSupplier/:id',authMiddleware,SupplierController.DeleteSupplier)

//? Product Routes
//CreateProduct
router.post('/createProduct',authMiddleware,ProductController.CreateProduct)
//ProductDetails
router.get('/productDetails/:id',authMiddleware,ProductController.ProductDetails)
//UpdateProduct
router.post('/updateProduct/:id',authMiddleware,ProductController.ProductUpdate) 
//ProductDropdown
router.get('/productDropdown',authMiddleware,ProductController.ProductDropdown)
//ProductList
router.get('/productList/:pageNumber/:perPage/:search',authMiddleware,ProductController.ProductDetailsList)
//DeleteProduct
router.get('/deleteProduct/:id',authMiddleware,ProductController.DeleteProduct)

//? ExpenseType Routes
//CreateExpenseType
router.post('/createExpenseType',authMiddleware,ExpenseTypeController.CreateExpenseType)
//ExpenseTypeDetails
router.get('/expenseTypeDetails/:id',authMiddleware,ExpenseTypeController.ExpenseTypeDetails)
//UpdateExpenseType
router.post('/updateExpenseType/:id',authMiddleware,ExpenseTypeController.UpdateExpenseType)
//DeleteExpenseType
router.get('/deleteExpenseType/:id',authMiddleware,ExpenseTypeController.DeleteExpenseType)
//ExpenseTypeDropdown
router.get('/expenseTypeDropdown',authMiddleware,ExpenseTypeController.ExpenseTypeDropdown)
//ExpenseTypeList
router.get('/expenseTypeList/:pageNumber/:perPage/:search',authMiddleware,ExpenseTypeController.ExpenseTypeList)

//? Expense Routes
//CreateExpense
router.post('/createExpense',authMiddleware,ExpenseController.CreateExpense)
//ExpenseDetails
router.get('/expenseDetails/:id',authMiddleware,ExpenseController.ExpenseDetails)
//UpdateExpense
router.post('/updateExpense/:id',authMiddleware,ExpenseController.UpdateExpense)
//DeleteExpense
router.get('/deleteExpense/:id',authMiddleware,ExpenseController.DeleteExpense)
//ExpenseList
router.get('/expenseDetailsList/:pageNumber/:perPage/:search',authMiddleware,ExpenseController.ExpenseDetailsList)

//? Purchase Routes
//CreatePurchase
router.post('/createPurchase',authMiddleware,PurchaseController.CreatePurchase)
//PurchaseList
router.get('/purchaseList/:pageNumber/:perPage/:search',authMiddleware,PurchaseController.PurchaseList)
//PurchaseDelete
router.get('/purchaseDelete/:id',authMiddleware,PurchaseController.PurchaseDelete)

//? Sales Routes
//CreatePurchase
router.post('/createSales',authMiddleware,SalesController.CreateSales)
//SalesList
router.get('/salesList/:pageNumber/:perPage/:search',authMiddleware,SalesController.SalesList)
//SalesDelete
router.get('/salesDelete/:id',authMiddleware,SalesController.SalesDelete)

//? Return Routes
//CreatePurchase
router.post('/CreateReturn',authMiddleware,ReturnController.CreateReturn)
//SalesList
router.get('/returnList/:pageNumber/:perPage/:search',authMiddleware,ReturnController.ReturnList)
//SalesDelete
router.get('/returnDelete/:id',authMiddleware,ReturnController.ReturnDelete)

//? Report Routes
//Create Expense Report
router.post('/createExpenseReport',authMiddleware,ReportController.ExpenseReportByDate)
//Create Purchase Report
router.post('/createPurchaseReport',authMiddleware,ReportController.PurchaseReportByDate)
//Create Sales Report
router.post('/createSalesReport',authMiddleware,ReportController.SalesReportByDate)
//Create Return Report
router.post('/createReturnReport',authMiddleware,ReportController.RetunReportByDate)

//? Summary Routes
//Expense Summary
router.get('/expenseSummary',authMiddleware,SummaryController.ExpenseSummary)
//Purchase Summary
router.get('/purchaseSummary',authMiddleware,SummaryController.PurchaseSummary)
//Sales Summary
router.get('/salesSummary',authMiddleware,SummaryController.SalesSummary)
//Return Summary
router.get('/returnSummary',authMiddleware,SummaryController.ReturnSummary)


module.exports = router     