import { describe, expect, it } from 'vitest'
import { buildFiltersQuery } from './buildFiltersQuery'
import { filtersSlice } from '../store/reducers/filters'

describe('URL builder func', () => {
	it('should return correct query string', () => {
		const ans = buildFiltersQuery(filtersSlice.getInitialState())

		console.log(ans)

		expect(ans).toBeTypeOf('string')
	})

	// it('should return correct query string', () => {
	// 	const ans = buildFiltersQuery(filtersSlice.getInitialState())

	// 	const parsedAns = new URLSearchParams(ans)

	// 	console.log(parsedAns)

	// 	expect(ans).toBe(Object.fromEntries(parsedAns.entries()))
	// })
})
