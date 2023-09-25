import { fetchTeachers } from '../../1project/fetch.mjs'
// import data from '../../3.json' assert { type: 'json' }
import { MongoClient } from 'mongodb'

const mongo = new MongoClient('mongodb://127.0.0.1:27017')

async function run() {
	await mongo.connect()

	const db = mongo.db('local')

	const teachers = db.collection('teachers')

	for (let i = 1; i < 258; i++) {
		await new Promise((resolve) => setTimeout(resolve, 1000))

		const res = await fetchTeachers(i)
		console.log(
			i,
			res.data.map((t) => t.user_info.nickname),
		)
		await teachers.insertMany(res.data)
	}
}

run()
