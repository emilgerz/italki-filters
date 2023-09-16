export const getAdress = (value: string) => {
	const splittedVal = value.split(', ')

	return {
		city: splittedVal.at(0),
		street: splittedVal.at(1),
		home: Number(splittedVal.at(2)),
		appartment: Number(splittedVal.at(3)),
	}
}
