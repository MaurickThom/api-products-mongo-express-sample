const express = require('express')
const mongoose = require('mongoose')

const Product = require('./models/product')

const app = express()

const port = process.env.PORT || 3000

app.use(express.urlencoded({
	extended: true
}))

app.get('/api/product', (req, res) => {
	Product.find({}, (err, products) => {
		if(err) {
			return res.status(500).send(`Error of request ${err}`)
			throw err
		}
		if(!products) {
			return res.status(404).send(`Thera are not products ${err}`)
		}		
		res.status(200).json({
			products
		})
	})
})

app.get('/api/product/:productId', (req, res) => {
	const productId = req.params.productId
	Product.findById(productId, (err, product) => {
		if(err) {
			return res.status(500).send(`Error of request ${err}`)
			throw err
		}
		if(!product) {
			return res.status(404).send(`Product not exists ${err}`)
		}
		res.status(200).json({
			product
		})
	})
})

app.post('/api/product', (req, res) => {
	console.log('POST api/product')
	console.log(req.body)
	let product = new Product()
	product.name = req.body.name
	product.description = req.body.description
	product.picture = req.body.picture
	product.price = req.body.price
	product.category = req.body.category

	product.save((err, productStored) => {
		if(err) {
			res.status(500).send(`Error saving product, ${err}`)
			throw err
		}
		res.status(200).json({
			product: productStored
		})
	})
})

app.put('/api/product/:productId', (req, res) => {
	const productId = req.params.productId
	let update = req.body
	Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
		if(err) {
			res.status(500).send(`Error updating product, ${err}`)
			throw err			
		}
		if(!productUpdated) {
			return res.status(404).send(`Product not exists ${err}`)
		}
		res.status(200).send({ product: productUpdated })
	})
})

app.delete('/api/product/:productId', (req, res) => {
	const productId = req.params.productId
	Product.findById(productId, (err, product) => {
		if(err) {
			res.status(500).send(`Error deleting product, ${err}`)
			throw err			
		}
		if(!product) {
			return res.status(404).send(`Product not exists ${err}`)
		}
		product.remove(err => {
			if(err) {
				return res.status(500).send(`Error deleting product, ${err}`)
			}
			res.status(200).send('Product deleted')
		})
	})	 
})

mongoose.connect('mongodb://localhost:27017/shop', (err, res) => {
	if(err) {
		console.log(`Error Establishing Database Connection ${err}`)
	} 
	console.log('Established Database Connection')

	app.listen(port, () => {
		console.log(`Running on http://localhost:${port}`)
	})
})
