const express = require('express')

const router = express.Router()

// Controller
const { addProduct, getProduct, getAllProducts, updateProduct, deleteProduct } = require('../controllers/products')
const { addCategory, getAllCategories, getCategory, updateCategory, deleteCategory } = require('../controllers/category')
const { addTransaction, getAllTransactions, notification } = require('../controllers/transaction')
const { getProfile, updateProfile } = require('../controllers/profile')
const { register, login, checkAuth } = require('../controllers/auth')

// Middleware
// import middleware here
const { auth } = require('../middlewares/auth')
const { uploadFile } = require('../middlewares/uploadFile')

// Register & Login
router.post('/register', register)
router.post('/login', login)
router.get('/check-auth', auth, checkAuth);

// Product route
router.post('/product', auth, uploadFile('image'), addProduct)
router.get('/products', auth, getAllProducts)
router.get('/product/:id', auth, getProduct)
router.patch("/product/:id", auth, uploadFile("image"), updateProduct);
router.delete('/product/:id', auth, deleteProduct)

// Category
router.post('/category', auth, addCategory)
router.get('/categories', auth, getAllCategories)
router.get('/category/:id', auth, getCategory)
router.patch('/category/:id', auth, updateCategory)
router.delete('/category/:id', auth, deleteCategory)

// Transaction
router.post('/transaction', auth, addTransaction)
router.get('/transactions', auth, getAllTransactions)

// Create router for notification with POST method here ...
router.post("/notification", notification);

// Profile
router.patch('/profile', auth, uploadFile('image'), updateProfile)
router.get('/profile', auth, getProfile)

module.exports = router