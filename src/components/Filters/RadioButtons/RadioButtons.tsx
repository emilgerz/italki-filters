import { cn } from '../../../utils/cn'
import s from './RadioButtons.module.scss'

interface RadioButtonsProps<T extends string> {
	title: string
	options: readonly T[]
	value: T[]
	transcript?: Record<T, string>
	onClick: (v: T) => void
}

export function RadioButtons<T extends string>({
	title,
	options,
	value,
	onClick,
}: RadioButtonsProps<T>) {
	return (
		<div className={s.container}>
			<h4>{title}</h4>

			{options.map((option) => (
				<button
					key={option}
					className={cn(s.button, value.at(0) === option && s.buttonActive)}
					onClick={() => onClick(option)}
				>
					<span>{option}</span>

					{option === value.at(0) && (
						<span>{value.at(1) === 'asc' ? '⬇️' : '⬆️'}</span>
					)}
				</button>
			))}
		</div>
	)
}
