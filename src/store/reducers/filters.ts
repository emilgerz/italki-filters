import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CountryId, Language } from '../../utils/types/schemas'

const initialState: Filters = {
	languages: [],
	countries: [],
}

// export type Filters = typeof initialState
export interface Filters {
	languages: string[]
	countries: string[]
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
	},
})
