import { fetchTeachers } from '../../1project/fetch.mjs'
import { MongoClient } from 'mongodb'

const mongo = new MongoClient('mongodb://127.0.0.1:27017')

async function run() {
	await mongo.connect()

	const db = mongo.db('local')

	const teachers = db.collection('teachers')

	const languages = [
		'english',
		'chinese',
		'french',
		'spanish',
		'portuguese',
		'german',
		'japanese',
	]

	for (let langIndex = 0; langIndex < languages.length; langIndex++) {
		const priceWindow = 50
		const pageSize = 20

		for (let minPrice = 0; minPrice <= 8000; minPrice += priceWindow) {
			// let previousUsers = ['']
			// paging: { page: 1, page_size: 20, total: 78, has_next: 1 }

			await new Promise((resolve) => setTimeout(resolve, 500))
			const res = await fetchTeachers(
				1,
				minPrice,
				minPrice + priceWindow,
				languages[langIndex],
			)

			const { total } = res.paging
			console.log({ minPrice, maxPrice: minPrice + priceWindow, total })

			for (let i = 1; i <= Math.ceil(total / pageSize); i++) {
				// await new Promise((resolve) => setTimeout(resolve, 500))
				const res = await fetchTeachers(
					i,
					minPrice,
					minPrice + priceWindow,
					languages[langIndex],
				)

				try {
					const fetchedUsers = res.data.map((t) => t.user_info.user_id)
					console.log(i, fetchedUsers)

					// if (fetchedUsers[0] === previousUsers[0]) {
					// 	break
					// }

					await teachers.insertMany(res.data)
					// previousUsers = fetchedUsers
				} catch (error) {
					continue
				}
			}
		}
	}
}

// run()

async function filterDublicates() {
	await mongo.connect()

	const db = mongo.db('local')

	const teachers = db.collection('Copy_of_teachers')

	// db = db.getSiblingDB('local')
	const unique = teachers
		.aggregate([
			{ $group: { _id: '$user_info.user_id', mongoId: { $first: '$_id' } } },
		])
		.toArray()
		// .then((arr) => arr.map((doc) => doc.mongoId))
		.then(console.log)
	// .map((doc) => doc.mongoId)

	// teachers
	// 	.deleteMany({ _id: { $nin: unique } })
	// 	.aggregate([{ $group: { _id: '$user_info.user_id', count: { $sum: 1 } } }])
	// 	.toArray()
	// 	.filter(({ count }) => count > 1)
	// 	.sort((a, b) => b.count - a.count)
	// // .forEach(({ _id }) => {})
}

filterDublicates()
