const mongoose = require('mongoose')

const app = require('./app')
const config = require('./config')

mongoose.connect(config.db, (err, res) => {
	if(err) {
		console.log(`Error Establishing Database Connection ${err}`)
	} 
	console.log('Established Database Connection')

	app.listen(config.port, () => {
		console.log(`Running on http://localhost:${config.port}`)
	})
})
