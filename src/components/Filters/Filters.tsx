import { Teacher, Language, CountryId } from '../../utils/types/schemas'
import response from '../../2.json'
import { Multiselect } from './Multiselect/Multiselect'
import s from './Filters.module.scss'
import { countryList } from '../../assets/countryList'
import { RadioButtons } from './RadioButtons/RadioButtons'
import { useDispatch, useSelector } from '../../store/store'
import { sortingSlice } from '../../store/reducers/sorting'
import { SORTING_OPTIONS } from '../../store/reducers/sorting'
import { filtersSlice } from '../../store/reducers/filters'
import { RangeInputs } from './RangeInputs/RangeInputs'

const data = response.data as unknown as Teacher[]

const langsData: Record<Language, number> = {}
const countriesData: Record<CountryId, number> = {}

for (const teacher of data) {
	for (const { language } of teacher.teacher_info.teach_language) {
		langsData[language] ??= 0
		langsData[language]++
	}

	countriesData[teacher.user_info.living_country_id] ??= 0
	countriesData[teacher.user_info.living_country_id]++
}

export function Filters() {
	const dispatch = useDispatch()
	const sorting = useSelector((state) => state.sorting)
	const { countries, languages, price, studentsCount, sessionsCount } =
		useSelector((state) => state.filters)

	return (
		<div className={s.filters}>
			<RadioButtons
				title="Sorting"
				options={SORTING_OPTIONS}
				onChange={(v) => dispatch(sortingSlice.actions.setSorting(v))}
				value={sorting}
			/>

			<Multiselect
				title="Languages"
				data={langsData}
				setValues={(v) => dispatch(filtersSlice.actions.setLanguage(v))}
				values={languages}
			/>

			<Multiselect
				title="Countries"
				data={countriesData}
				setValues={(v) => dispatch(filtersSlice.actions.setCountry(v))}
				values={countries}
				transcript={countryList}
			/>

			<RangeInputs
				title="Price"
				setValueFrom={(v) => dispatch(filtersSlice.actions.setPriceFrom(v))}
				setValueTo={(v) => dispatch(filtersSlice.actions.setPriceTo(v))}
				value={price}
			/>

			<RangeInputs
				title="Students Count"
				setValueFrom={(v) =>
					dispatch(filtersSlice.actions.setStudentsCountFrom(v))
				}
				setValueTo={(v) => dispatch(filtersSlice.actions.setStudentsCountTo(v))}
				value={studentsCount}
			/>

			<RangeInputs
				title="Sessions Count"
				setValueFrom={(v) =>
					dispatch(filtersSlice.actions.setSessionsCountFrom(v))
				}
				setValueTo={(v) => dispatch(filtersSlice.actions.setSessionsCountTo(v))}
				value={sessionsCount}
			/>
		</div>
	)
}
