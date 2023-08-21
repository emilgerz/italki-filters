import { writeFileSync } from 'fs'

fetch('https://api.italki.com/api/v2/teachers', {
	teach_language: { language: 'english' },
	page: 1,
	page_size: 20,
})
	.then((response) => response.json())
	.then((val) => JSON.stringify(val))
	.then((val) => writeFileSync('./3.json', val))
