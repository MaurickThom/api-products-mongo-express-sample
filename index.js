const mongoose = require('mongoose')
const app = require('./app')

const port = process.env.PORT || 3000

mongoose.connect('mongodb://localhost:27017/shop', (err, res) => {
	if(err) {
		console.log(`Error Establishing Database Connection ${err}`)
	} 
	console.log('Established Database Connection')

	app.listen(port, () => {
		console.log(`Running on http://localhost:${port}`)
	})
})
