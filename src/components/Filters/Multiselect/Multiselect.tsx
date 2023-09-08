import { useState, useMemo } from 'react'
import s from './Multiselect.module.scss'

interface MultiselectProps<T extends string> {
	data: Record<T, number>
	setValues: (x: T) => void
	values: T[]
	title: string
	transcript?: Record<string, string>
}

export function Multiselect<T extends string>({
	data,
	setValues,
	values,
	title,
	transcript,
}: MultiselectProps<T>) {
	const [input, setInput] = useState('')

	const options = useMemo(
		() =>
			(Object.keys(data) as T[])
				.sort((a, b) => data[b] - data[a]) // eng, spa, ita
				.map((key) => ({
					key,
					title: transcript ? transcript[key] : key,
				}))
				.filter(({ title }) =>
					title.toLowerCase().includes(input.toLowerCase()),
				),
		[data, input, transcript],
	)

	// const checkboxHandler = (value: T) => {
	// 	if (values.includes(value)) {
	// 		setValues(values.filter((el) => el !== value))
	// 	} else {
	// 		setValues([...values, value])
	// 	}
	// }

	const inputHandler = (value: string) => {
		const onlyLetters = value.replace(/\W|[0-9]/g, '')

		setInput(onlyLetters)
	}

	return (
		<div className={s.filterSelect}>
			<h4>{title}</h4>

			<input
				type="text"
				value={input}
				onChange={(e) => inputHandler(e.target.value)}
			/>

			{options.map(({ key, title }) => (
				<label key={key}>
					<input
						type="checkbox"
						value={key}
						checked={values.includes(key)}
						onChange={(e) => setValues(e.target.value as T)}
					/>
					{title} - {data[key]}
				</label>
			))}
		</div>
	)
}
