import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Teacher } from '../../utils/types/schemas'

export const SORTING_OPTIONS = [
	'price',
	'students',
	'lessons',
	'ratio',
] as const

export type SortingOption = (typeof SORTING_OPTIONS)[number]

export type SortingSliceState = {
	sorting: SortingOption
	direction: 'asc' | 'desc'
}

const initialState: SortingSliceState = { sorting: 'price', direction: 'asc' }

export const sortingKeyExtractors: Record<
	SortingOption,
	(t: Teacher) => number
> = {
	price: (a) => a.course_info.min_price,
	lessons: (a) => a.teacher_info.session_count,
	students: (a) => a.teacher_info.student_count,
	ratio: (a) => a.teacher_info.session_count / a.teacher_info.student_count,
}

export const sortingSlice = createSlice({
	name: 'sorting',
	initialState,
	reducers: {
		setSorting(state, action: PayloadAction<SortingOption>) {
			if (state.sorting === action.payload) {
				return {
					sorting: action.payload,
					direction: state.direction === 'asc' ? 'desc' : 'asc',
				}
			}

			return {
				sorting: action.payload,
				direction: 'asc',
			}
		},
	},
})
