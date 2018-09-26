const express = require('express')
const api = express.Router()

const isAuth = require('../middlewares/auth')
const ProductController = require('../controllers/product')
const UserController = require('../controllers/user')

api.get('/product', ProductController.getProducts)
api.get('/product/:productId', ProductController.getProduct)
api.post('/product', ProductController.saveProduct)
api.put('/product/:productId', ProductController.updateProduct)
api.delete('/product/:productId', ProductController.deleteProduct)
api.post('/signup', UserController.signUp)
api.post('/signin', UserController.signIn)

api.get('/private', isAuth, (req, res) => {
	req.status(200).send('Welcome to private page, You have access')
})

module.exports = api