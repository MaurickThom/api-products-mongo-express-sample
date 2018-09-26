const express = require('express')
const mongoose = require('mongoose')

const Product = require('./models/product')

const app = express()

const port = process.env.PORT || 3000

app.use(express.urlencoded({
	extended: true
}))

app.get('/api/product', (req, res) => {
	res.status(200).json({
		products: []
	})
})

app.get('/api/product/:productId', (req, res) => {
	res.status(200).send(`Product: ${ req.params.productId }`)
})

app.post('/api/product', (req, res) => {
	console.log('POST api/product')
	console.log(req.body)
	let product = new Product()
	product.name = req.body.name
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

})

app.delete('/api/productId/:productId', (req, res) => {

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
