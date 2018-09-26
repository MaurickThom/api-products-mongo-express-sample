const express = require('express')
const mongoose = require('mongoose')

const ProductController = require('./controllers/product')

const app = express()

const port = process.env.PORT || 3000

app.use(express.urlencoded({
	extended: true
}))

app.get('/api/product', ProductController.getProducts)
app.get('/api/product/:productId', ProductController.getProduct)
app.post('/api/product', ProductController.saveProduct)
app.put('/api/product/:productId', ProductController.updateProduct)
app.delete('/api/product/:productId', ProductController.deleteProduct)

mongoose.connect('mongodb://localhost:27017/shop', (err, res) => {
	if(err) {
		console.log(`Error Establishing Database Connection ${err}`)
	} 
	console.log('Established Database Connection')

	app.listen(port, () => {
		console.log(`Running on http://localhost:${port}`)
	})
})
