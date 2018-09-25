const express = require('express')
const mongoose = require('mongoose')

const app = express()

const port = process.env.PORT || 3000

app.get('/api/product', (req, res) => {
	res.status(200).json({
		products: []
	})
})

app.get('/api/product/:productId', (req, res) => {
	res.status(200).send(`Product: ${ req.params.productId }`)
})

app.post('/api/product', (req, res) => {
	console.log(req.body)
	res.status(200).send('The product are received')
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
