import { createSelector, createSlice } from '@reduxjs/toolkit'
import response from '../../2.json'
import { Teacher } from '../../utils/types/schemas'
import { RootState } from '../store'
import { sortingKeyExtractors } from './sorting'

const data = response.data as unknown as Teacher[]

const initialState = data

export const teachersSlice = createSlice({
	name: 'teachers',
	initialState,
	reducers: {},
})

export const teachersSelector = (state: RootState) => state.teachers
export const sortingKeySelector = (state: RootState) => state.sorting

export const filteredTeachersSelector = (state: RootState) => {
	if (state.filters.languages.length === 0) {
		return state.teachers
	}

	return state.teachers.filter((teacher) =>
		teacher.teacher_info.teach_language.some((lang) =>
			state.filters.languages.includes(lang.language),
		),
	)
}

export const sortedTeachersSelector = createSelector(
	filteredTeachersSelector,
	sortingKeySelector,
	(teachers, sorting) => {
		console.log('sortedTeachersSelector + memo')
		return [...teachers].sort(
			(a, b) =>
				sortingKeyExtractors[sorting](a) - sortingKeyExtractors[sorting](b),
		)
	},
)

export const sortedTeachersSelectorLegacy = (state: RootState) => {
	console.log('sortedTeachersSelector')

	const { sorting, teachers } = state

	return [...teachers].sort(
		(a, b) =>
			sortingKeyExtractors[sorting](a) - sortingKeyExtractors[sorting](b),
	)
}

// https://www.npmjs.com/package/assert-never
export function assertNever(value: never): never {
	throw new Error(
		`Unhandled discriminated union member: ${JSON.stringify(value)}`,
	)
}
