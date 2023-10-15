import { SortingSliceState } from '../../../store/reducers/sorting'
import { cn } from '../../../utils/cn'
import s from './RadioButtons.module.scss'

interface RadioButtonsProps<T extends string> {
	title: string
	options: readonly T[]
	value: SortingSliceState
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
					className={cn(s.button, value.sorting === option && s.buttonActive)}
					onClick={() => onClick(option)}
				>
					<span>{option}</span>

					{option === value.sorting && (
						<span>{value.direction === 'asc' ? '⬇️' : '⬆️'}</span>
					)}
				</button>
			))}
		</div>
	)
}
