import { Teacher, Language, CountryId } from '../../utils/types/schemas'
import response from '../../2.json'
import { Multiselect } from './Multiselect/Multiselect'
import { useState } from 'react'
import s from './Filters.module.scss'
import { countryList } from '../../assets/countryList'
import { RadioButtons } from './RadioButtons/RadioButtons'
import { useDispatch, useSelector } from '../../store/store'
import { sortingSlice } from '../../store/reducers/sorting'
import { SORTING_OPTIONS } from '../../store/reducers/sorting'

const data = response.data as unknown as Teacher[]

const langs: Record<Language, number> = {}
const countries: Record<CountryId, number> = {}

for (const teacher of data) {
	for (const { language } of teacher.teacher_info.teach_language) {
		langs[language] ??= 0
		langs[language]++
	}

	countries[teacher.user_info.living_country_id] ??= 0
	countries[teacher.user_info.living_country_id]++
}

export function Filters() {
	const [filterLanguages, setFilterLanguages] = useState<Language[]>([])
	const [filterCountry, setFilterCountry] = useState<CountryId[]>([])

	const dispatch = useDispatch()
	const sorting = useSelector((state) => state.sorting)

	return (
		<div className={s.filters}>
			<RadioButtons
				title="Sorting"
				options={SORTING_OPTIONS}
				onChange={(value) => dispatch(sortingSlice.actions.setSorting(value))}
				value={sorting}
			/>

			<Multiselect
				title="Languages"
				data={langs}
				setValues={setFilterLanguages}
				values={filterLanguages}
			/>

			<Multiselect
				title="Countries"
				data={countries}
				setValues={setFilterCountry}
				values={filterCountry}
				transcript={countryList}
			/>
		</div>
	)
}
