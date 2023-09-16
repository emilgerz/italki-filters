import s from './RadioButtons.module.scss'

interface RadioButtonsProps<T extends string> {
	title: string
	options: readonly T[]
	value: T
	transcript?: Record<T, string>
	onChange: (v: T) => void
}

export function RadioButtons<T extends string>({
	title,
	options,
	value,
	onChange,
}: RadioButtonsProps<T>) {
	return (
		<div className={s.container}>
			<h4>{title}</h4>

			{options.map((option) => (
				<label key={option}>
					<input
						type="radio"
						name={title}
						value={option}
						checked={value === option}
						onChange={() => onChange(option)}
					/>
					{option}
				</label>
			))}
		</div>
	)
}
