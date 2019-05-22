const _e = module.exports
const mariadb = require('mariadb')
const config = require('../config/config')
const adminDb = config.adminDb
const dbParams = {host: adminDb.HOST, user: adminDb.USERNAME, password: adminDb.PASSWORD, database: adminDb.DATABASE}

_e.getUserByUsernamePassword = (credentials) => {
	return new Promise((resolve, reject) => {

		mariadb.createConnection(dbParams).then(conn => {

			conn.query('select `id`, `uid`, `role`, `system`, `data_status` from `users` where `username`=? and `password`=?', [credentials.username, credentials.password])
				.then(rows => {
					resolve(rows[0])
					conn.end()
				})
				.catch(err => {
					conn.end()
					reject(err)
				})
		
		})
		.catch(err => {
			conn.end()
			reject(err)
		})

	})
}

_e.getUserById = (userId) => {
	return new Promise((resolve, reject) => {

		mariadb.createConnection(dbParams).then(conn => {

			conn.query('select `id`, `uid`, `role`, `system`, `data_status` from `users` where `id`=?', [userId])
				.then(rows => {
					resolve(rows[0])
					conn.end()
				})
				.catch(err => {
					conn.end()
					reject(err)
				})

		})
		.catch(err => {
			conn.end()
			reject(err)
		})

	})
}