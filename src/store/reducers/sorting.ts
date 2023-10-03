import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Teacher } from '../../utils/types/schemas'

export const SORTING_OPTIONS = [
	'price',
	'students',
	'lessons',
	'ratio',
] as const

export type Sorting = [(typeof SORTING_OPTIONS)[number], 'asc' | 'desc']

const initialState = ['price', 'asc'] as Sorting

export const sortingKeyExtractors: Record<Sorting[0], (t: Teacher) => number> =
	{
		price: (a) => a.course_info.min_price,
		lessons: (a) => a.teacher_info.session_count,
		students: (a) => a.teacher_info.student_count,
		ratio: (a) => a.teacher_info.session_count / a.teacher_info.student_count,
	}

export const sortingSlice = createSlice({
	name: 'sorting',
	initialState,
	reducers: {
		setSorting(state, action: PayloadAction<Sorting[0]>) {
			if (state[0] === action.payload) {
				if (state[1] === 'asc') {
					return [action.payload, 'desc']
				} else {
					return [action.payload, 'asc']
				}
			}

			return [action.payload, 'asc']
		},
	},
})
