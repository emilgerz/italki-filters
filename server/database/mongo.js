import { fetchTeachers } from '../../1project/fetch.mjs'
// import data from '../../3.json' assert { type: 'json' }
import { MongoClient } from 'mongodb'

const mongo = new MongoClient('mongodb://127.0.0.1:27017')

async function run() {
	await mongo.connect()

	const db = mongo.db('local')

	const teachers = db.collection('teachers')

	const priceWindow = 200
	const pageSize = 20

	for (let minPrice = 0; minPrice <= 1500; minPrice += priceWindow) {
		// let previousUsers = ['']
		// paging: { page: 1, page_size: 20, total: 78, has_next: 1 }

		await new Promise((resolve) => setTimeout(resolve, 500))
		const res = await fetchTeachers(1, minPrice, minPrice + priceWindow)

		const { total } = res.paging
		console.log({ minPrice, maxPrice: minPrice + priceWindow, total })

		for (let i = 1; i <= Math.ceil(total / pageSize); i++) {
			await new Promise((resolve) => setTimeout(resolve, 500))
			const res = await fetchTeachers(i, minPrice, minPrice + priceWindow)

			try {
				const fetchedUsers = res.data.map((t) => t.user_info.user_id)
				console.log(i, fetchedUsers)

				// if (fetchedUsers[0] === previousUsers[0]) {
				// 	break
				// }

				await teachers.insertMany(res.data)
				// previousUsers = fetchedUsers
			} catch (error) {
				console.log('fake error', error)
			}
		}
	}
}

run()

async function filterDublicates() {
	await mongo.connect()

	const db = mongo.db('local')

	const teachers = db.collection('Copy_of_teachers')

	// 	db = db.getSiblingDB("local");
	// const unique = db.getCollection("teachers").aggregate([{$group: {_id: "$user_info.user_id", mongoId: {$first: "$_id"}}}]).toArray().map((doc) => doc.mongoId)

	// db.getCollection("teachers").deleteMany({ _id: { $nin: unique } })
	// //.aggregate([
	// //    {$group : {_id:"$user_info.user_id", count:{$sum:1}}}
	// //]).toArray().filter(({count}) => count > 1).sort((a, b) => b.count - a.count).forEach(({_id}) => {})
}

// // filterDublicates()
