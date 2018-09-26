const mongoose = require('mongoose')

const User = require('../models/user')
const service = require('../services')

const signUp = (req, res) => {
	const user = new User({
		email: req.body.email,
		displayName: req.body.displayName,

	})

	user.save((err) => {
		if(err) {
			return res.status(500).send('Error creating user')
		}
		return res.status(200).json({
			token: service.createToken(user)
		})
	})
}

const signIn = (req, res) => {

}

module.exports = {
	signIn,
	signUp
}