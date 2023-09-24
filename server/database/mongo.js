import data from '../../3.json' assert { type: 'json' }
import { MongoClient } from 'mongodb'

const mongo = new MongoClient('mongodb://127.0.0.1:27017')

async function run() {
	await mongo.connect()

	const db = mongo.db('local')

	const teachers = db.collection('teachers')

	teachers.insertMany(data.data)
}

run()
