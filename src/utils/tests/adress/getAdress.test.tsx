import { describe, expect, it } from 'vitest'
import { getAdress } from './getAdress'

describe.concurrent('basic test', () => {
	it('Part adress', () => {
		const stringAdress = 'Moscow, Lermontov str., 32, 33'

		const expectedAdress = {
			city: 'Moscow',
			street: 'Lermontov str.',
			home: 32,
			appartment: 33,
		}

		expect(getAdress(stringAdress)).toMatchObject(expectedAdress)
	})
})
