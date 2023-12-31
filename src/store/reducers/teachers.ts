/* eslint-disable no-mixed-spaces-and-tabs */
import { createSlice } from '@reduxjs/toolkit'
import response from '../../2.json'
import { Teacher } from '../../utils/types/schemas'
import { RootState } from '../store'
// import { filterPredicates } from './filters'
import { PayloadAction } from '@reduxjs/toolkit'
import { fetchTeachers } from '../../utils/fetchTeachers'

const data = response.data as unknown as Teacher[]

const initialState = data

export const teachersSlice = createSlice({
	name: 'teachers',
	initialState,
	reducers: {
		setTeachers(_, action: PayloadAction<Teacher[]>) {
			return action.payload
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchTeachers.fulfilled, (_, action) => action.payload)
	},
})

export const teachersSelector = (state: RootState) => state.teachers
export const sortingKeySelector = (state: RootState) => state.sorting

// export const filteredTeachersSelector = (state: RootState) => {
// 	// Object.keys(state.filters).reduce((acc, filterName) => , [])

// 	let teachers = state.teachers
// 	for (const key in state.filters) {
// 		teachers = teachers.filter((teacher) =>
// 			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// 			// @ts-ignore
// 			filterPredicates[key](teacher, state.filters[key]),
// 		)
// 	}

// 	return teachers
// }

// export const sortedTeachersSelector = createSelector(
// 	filteredTeachersSelector,
// 	sortingKeySelector,
// 	(teachers, sorting) => {
// 		console.log('sortedTeachersSelector + memo')
// 		return [...teachers].sort((a, b) =>
// 			sorting[1] === 'asc'
// 				? sortingKeyExtractors[sorting[0]](a) -
// 				  sortingKeyExtractors[sorting[0]](b)
// 				: sortingKeyExtractors[sorting[0]](b) -
// 				  sortingKeyExtractors[sorting[0]](a),
// 		)
// 	},
// )

// export const sortedTeachersSelectorLegacy = (state: RootState) => {
// 	console.log('sortedTeachersSelector')

// 	const { sorting, teachers } = state

// 	return [...teachers].sort(
// 		(a, b) =>
// 			sortingKeyExtractors[sorting[0]](a) - sortingKeyExtractors[sorting[0]](b),
// 	)
// }

// https://www.npmjs.com/package/assert-never
export function assertNever(value: never): never {
	throw new Error(
		`Unhandled discriminated union member: ${JSON.stringify(value)}`,
	)
}
