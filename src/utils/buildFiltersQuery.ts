import { Filters } from '../store/reducers/filters'

export function buildFiltersQuery(filters: Filters): string {
	const query = new URLSearchParams()

	for (const key in filters) {
		const internalKey = key as keyof Filters

		for (const value of filters[internalKey]) {
			query.append(key, value.toString())
		}
	}

	return query.toString()
}
