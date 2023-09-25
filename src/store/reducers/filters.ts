import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CountryId, Language, Teacher } from '../../utils/types/schemas'

const initialState: Filters = {
	languages: ['english'],
	countries: ['US'],
	price: [5, 100_000],
	studentsCount: [0, 100_000],
	sessionsCount: [0, 100_000],
}

export interface Filters {
	languages: string[]
	countries: string[]
	price: [number, number]
	studentsCount: [number, number]
	sessionsCount: [number, number]
}

type FilterPredicates = {
	[k in keyof Filters]: (t: Teacher, v: Filters[k]) => boolean
}

export const filterPredicates: FilterPredicates = {
	languages: (teacher, languages) =>
		teacher.teacher_info.teach_language.some((lang) =>
			languages.includes(lang.language),
		),
	countries: (teacher, countries) =>
		countries.includes(teacher.user_info.living_country_id),
	price: (teacher, [min, max]) =>
		teacher.course_info.min_price >= min &&
		teacher.course_info.min_price <= max,
	studentsCount: (teacher, [min, max]) =>
		teacher.course_info.min_price >= min &&
		teacher.course_info.min_price <= max,
	sessionsCount: (teacher, [min, max]) =>
		teacher.course_info.min_price >= min &&
		teacher.course_info.min_price <= max,
}

export const filtersSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setLanguage(state, action: PayloadAction<Language>) {
			if (state.languages.includes(action.payload)) {
				state.languages = state.languages.filter(
					(language) => language !== action.payload,
				)
			} else {
				state.languages.push(action.payload)
			}
		},

		setCountry(state, action: PayloadAction<CountryId>) {
			if (state.countries.includes(action.payload)) {
				return {
					...state,
					countries: state.countries.filter(
						(country) => country !== action.payload,
					),
				}
			}

			return {
				...state,
				countries: [...state.countries, action.payload],
			}
		},

		setPriceFrom: (state, action: PayloadAction<string>) => {
			state.price[0] = Number(action.payload)
		},

		setPriceTo: (state, action: PayloadAction<string>) => {
			state.price[1] = Number(action.payload)
		},

		setStudentsCountFrom: (state, action: PayloadAction<string>) => {
			state.studentsCount[0] = Number(action.payload)
		},

		setStudentsCountTo: (state, action: PayloadAction<string>) => {
			state.studentsCount[1] = Number(action.payload)
		},

		setSessionsCountFrom: (state, action: PayloadAction<string>) => {
			state.sessionsCount[0] = Number(action.payload)
		},

		setSessionsCountTo: (state, action: PayloadAction<string>) => {
			state.sessionsCount[1] = Number(action.payload)
		},
	},
})
