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
		const queryLanguage = Array.isArray(req.query.languages)
			? { $in: req.query.languages }
			: req.query.languages
		const queryContry = Array.isArray(req.query.countries)
			? { $in: req.query.countries }
			: req.query.countries

		const queryLanguageAndCountry = [
			{
				'teacher_info.teach_language.language': queryLanguage,
			},
			{ 'user_info.origin_country_id': queryContry },
		].filter((query) => Object.values(query).at(0) !== undefined)

		console.log(req.query)
		console.log(queryLanguageAndCountry)

		const teachers = mongo.db('local').collection('teachers_new_copy')

		// find({'teacher_info.teach_language.language': {$in: ['urdu']}})

		teachers
			.find(
				...queryLanguageAndCountry,
				{
					'cource_info.min_price': {
						$gt: Number(req.query.price[0]),
						$lt: Number(req.query.price[1]),
					},
				},
				// { 'cource_info.min_price':  },
				// {
				// 	'teacher_info.student_count': {
				// 		$gte: Number(req.query.studentsCount[0]),
				// 	},
				// },
				// {
				// 	'teacher_info.student_count': {
				// 		$lte: Number(req.query.studentsCount[1]),
				// 	},
				// },
				// {
				// 	'cource_info.trial_session_count': {
				// 		$gte: Number(req.query.sessionsCount[0]),
				// 	},
				// },
				// {
				// 	'cource_info.trial_session_count': {
				// 		$lte: Number(req.query.sessionsCount[1]),
				// 	},
				// },
			)
			.limit(100)
			.toArray()
			.then((ok) => {
				res.json(ok)
				return ok
			})
			.then(console.log)
	})

	app.listen(port, () => {
		console.log(`Example app listening on port ${port}`)
	})
})
