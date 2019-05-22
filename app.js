const express = require('express')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const app = express()
const port = 3003 || process.env.PORT
const config = require('./config/config')

// Models
const user = require('./models/user')

// Routes
const auth = require('./routes/auth')
const hsei = require('./routes/hsei')
const hmei = require('./routes/hmei')

// TODO 1: Allow CORS
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept, Authorization, authorization')
	next()
})

// TODO 2: Parse request of content-type - application/json
app.use(bodyParser.json())

// TODO 3: Parse request of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// TODO 4: Use Morgan to log api requests
app.use(require('morgan')('dev'))

// TODO 5: Verify JWT Token
app.use((req, res, next) => {

	try {

		const token = req.headers.authorization.split(' ')[1]
		jwt.verify(token, config.jwtKey, (err, payload) => {
			if (err) {
				res.status(400).json({
					err: err
				})
			}

			if (payload) {

				req.user = user.getUserById(payload.id)
				console.log(req.user)

			} else {
				console.log('No payload')
				next()
			}

		})

	} catch (e) {
		next()
	}

})

app.use('/auth', auth)
// app.use('/hsei', hsei)
// app.use('/hmei', hmei)

app.listen(port, () => console.log('http://127.0.0.1:' + port))