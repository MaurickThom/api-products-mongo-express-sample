const express = require('express')

const ProductController = require('./controllers/product')

const app = express()

app.use(express.urlencoded({
	extended: true
}))

app.get('/api/product', ProductController.getProducts)
app.get('/api/product/:productId', ProductController.getProduct)
app.post('/api/product', ProductController.saveProduct)
app.put('/api/product/:productId', ProductController.updateProduct)
app.delete('/api/product/:productId', ProductController.deleteProduct)

module.exports = app