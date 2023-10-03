// import { writeFileSync } from 'fs'

export const fetchTeachers = async (page, min_price, max_price) => {
	return fetch('https://api.italki.com/api/v2/teachers', {
		headers: {
			accept: 'application/json, text/plain, */*',
			'accept-language': 'ru-RU,ru;q=0.9,en;q=0.8',
			'content-type': 'application/json',
			'sec-ch-ua':
				'"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
			'sec-ch-ua-mobile': '?0',
			'sec-ch-ua-platform': '"Windows"',
			'sec-fetch-dest': 'empty',
			'sec-fetch-mode': 'cors',
			'sec-fetch-site': 'same-site',
			'x-browser-key': '6927da8d-1a24-4fbf-b49a-45cd24799d04',
			'x-device': '10',
			'x-locale': 'ru',
			Referer: 'https://www.italki.com/',
			'Referrer-Policy': 'strict-origin-when-cross-origin',
		},
		body: JSON.stringify({
			teach_language: {
				language: 'english',
				min_price,
				max_price,
			},
			page_size: 20,
			user_timezone: 'Europe/Moscow',
			page: page,
		}),
		method: 'POST',
	}).then((response) => response.json())
	// .then((val) => JSON.stringify(val))
	// .then((val) => writeFileSync('./3.json', val))
}

// fetchTeachers(1, 0, 500).then((res) => console.log(res))
