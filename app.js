const express = require('express')
const hbs = require('express-handlebars')
const api = require('./routes')

const app = express()

app.use(express.urlencoded({
	extended: true
}))

app.engine('.hbs', hbs({
	defaultLayout: 'default',
	extname: '.hbs'
}))
app.set('view engine', '.hbs')
app.get('/', (req, res) => {
	res.render('product')
})
app.use('/api', api)
app.get('/login', (req, res) => {
	res.render('login')
})

module.exports = app