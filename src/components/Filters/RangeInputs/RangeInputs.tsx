// я хз просто дженерик использовал для прикола
interface RangeInputsProps<T> {
	title: string
	value: T[]
	setValueFrom: (x: string) => void
	setValueTo: (x: string) => void
}

export function RangeInputs({
	title,
	value,
	setValueFrom,
	setValueTo,
}: RangeInputsProps<number>) {
	return (
		<div>
			<h4>{title}</h4>

			<input
				type="number"
				placeholder="From..."
				value={value[0] || ''}
				onChange={(e) => setValueFrom(e.target.value.replace(/\D/g, ''))}
			/>
			<input
				type="number"
				placeholder="To..."
				value={value[1] || ''}
				onChange={(e) => setValueTo(e.target.value.replace(/\D/g, ''))}
			/>
		</div>
	)
}
