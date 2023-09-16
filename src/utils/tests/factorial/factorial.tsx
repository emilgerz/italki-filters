export const factorial = (input: number) => {
	if (input < 0) {
		throw new Error('Negative input number')
	}

	let acc = 1

	for (let i = 1; i <= input; i++) {
		acc *= i
	}

	return acc
}
