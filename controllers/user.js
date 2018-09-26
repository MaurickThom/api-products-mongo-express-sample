const mongoose = require('mongoose')

const User = require('../models/user')
const service = require('../services')

const signUp = (req, res) => {
	const user = new User({
		email: req.body.email,
		displayName: req.body.displayName,
		password: req.body.password
	})

	user.save((err) => {
		if(err) {
			return res.status(500).send('Error:: creating user' + err)
		}
		return res.status(201).json({
			token: service.createToken(user)
		})
	})
}

const signIn = (req, res) => {
	User.find({ 
		email: req.body.email
	}, (err, user) => {
		if(err) {
			return res.status(500).send('Error user not found ' + err)
		}
		if(!user) {
			return res.status(404).send('The user not exists')
		}

		req.user = user
		res.status(200).send({
			message: 'You are logged',
			token: service.createToken(user)
		}) 
	})
}

module.exports = {
	signIn,
	signUp
}