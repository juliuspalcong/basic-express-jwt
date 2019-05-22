const express = require('express')
const router = express.Router()
const user = require('../models/user')
const jwt = require('jsonwebtoken')
const jwtVerifier = require('express-jwt')
const config = require('../config/config')

router.post('/signin', (req, res) => {
	
	user.getUserByUsernamePassword({username: 'pgc-admin', password: 'admin-pgc'})
	.then(user => {
		const token = jwt.sign({
			data: {
				id: user.id,
				uid: user.uid,
				username: user.username,
				role: user.role,
				system: user.system
			}
		}, config.jwtKey, { expiresIn: 60 * 30 })
		res.json({
			token: token
		})
	})
	.catch(err => console.log(err))

})

module.exports = router