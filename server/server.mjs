import express from 'express'
import { MongoClient } from 'mongodb'
import { createRequire } from 'module'
// import { cors } from 'cors'
const require = createRequire(import.meta.url)

const cors = require('cors')
const app = express()

app.use(cors())
const port = 3000

const mongo = new MongoClient('mongodb://127.0.0.1:27017')

mongo.connect().then(() => {
	app.get('/teachers', (req, res) => {
		const teachers = mongo.db('local').collection('teachers')

		teachers
			.find({})
			.toArray()
			.then((ok) => {
				res.json(ok)
			})
	})

	app.listen(port, () => {
		console.log(`Example app listening on port ${port}`)
	})
})
