// import { writeFileSync } from 'fs'

fetch('https://api.italki.com/api/v2/teachers', {
	method: 'POST',
	body: JSON.stringify({
		teach_language: { language: 'english' },
		page_size: 1,
		user_timezone: 'Europe/Moscow',
		page: 12,
	}),
})
	.then((response) => response.json())
	.then((val) => JSON.stringify(val))
	.then(console.log)
// .then((val) => writeFileSync('./3.json', val))
