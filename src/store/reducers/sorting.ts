import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export const SORTING_OPTIONS = [
	'price',
	'students',
	'lessons',
	'ratio',
] as const

export type Sorting = (typeof SORTING_OPTIONS)[number]

const initialState = 'price' as Sorting

export const sortingSlice = createSlice({
	name: 'sorting',
	initialState,
	reducers: {
		setSorting(_, action: PayloadAction<Sorting>) {
			return action.payload
		},
	},
})
