const Product = require('../models/product')

const getProduct = (req, res) => {
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
}

const getProducts = (req, res) => {
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
}

const saveProduct = (req, res) => {
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
}

const updateProduct = (req, res) => {
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
}

const deleteProduct = (req, res) => {
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
}

module.exports = {
	getProduct,
	getProducts,
	saveProduct,
	updateProduct,
	deleteProduct
}