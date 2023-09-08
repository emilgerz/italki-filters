import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Teacher } from '../../utils/types/schemas'

export const SORTING_OPTIONS = [
	'price',
	'students',
	'lessons',
	'ratio',
] as const

export type Sorting = (typeof SORTING_OPTIONS)[number]

const initialState = 'price' as Sorting

export const sortingKeyExtractors: Record<Sorting, (t: Teacher) => number> = {
	price: (a) => a.course_info.min_price,
	lessons: (a) => a.teacher_info.session_count,
	students: (a) => a.teacher_info.student_count,
	ratio: (a) => a.teacher_info.session_count / a.teacher_info.student_count,
}

export const sortingSlice = createSlice({
	name: 'sorting',
	initialState,
	reducers: {
		setSorting(_, action: PayloadAction<Sorting>) {
			return action.payload
		},
	},
})
