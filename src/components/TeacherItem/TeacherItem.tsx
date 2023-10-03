import { Teacher } from '../../utils/types/schemas'
import s from './TeacherItem.module.scss'
import { countryList } from '../../assets/countryList'
import { useSelector } from '../../store/store'
import { cn } from '../../utils/cn'
import { useState, useEffect, useRef } from 'react'

interface TeacherItemProps {
	item: Teacher
}

export function TeacherItem({ item }: TeacherItemProps) {
	const {
		nickname,
		avatar_file_name,
		living_city_name,
		origin_country_id,
		living_country_id,
		origin_city_name,
		timezone,
	} = item.user_info
	const { teach_language, student_count, tutor_rating, session_count } =
		item.teacher_info
	const { min_price } = item.course_info

	const [filtersPriceFrom, filtersPriceTo] = useSelector(
		(state) => state.filters.price,
	)

	const [infoVisible, setInfoVisible] = useState(false)

	const imgFetch = `https://imagesavatar-static01.italki.com/${avatar_file_name}_Avatar.jpg`

	const tableRef = useRef<HTMLTableElement>(null)
	const cardRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (infoVisible) {
			tableRef.current?.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
				inline: 'nearest',
			})
		} else {
			cardRef.current?.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
				inline: 'nearest',
			})
		}
	}, [infoVisible])

	return (
		<div
			className={s.teacher}
			ref={cardRef}
		>
			<div className={s.info}>
				<img
					src={imgFetch}
					className={s.avatar}
				/>

				<h3>{nickname}</h3>

				<p>
					Lives in{' '}
					<b>
						{living_city_name}, {countryList[living_country_id]}
					</b>
				</p>
				<p>
					Born in{' '}
					<b>
						{origin_city_name}, {countryList[origin_country_id]}
					</b>
				</p>
				<p>
					Timezone: <b>{timezone}</b>
				</p>
			</div>

			<div>
				<h3>Teachs:</h3>
				<ul>
					{teach_language.map(({ language, level }) => (
						<li key={language}>
							{language} - level {level}
						</li>
					))}
				</ul>
			</div>

			<div>
				<h3>Markable Info</h3>

				<p>
					Price: <b>$ {min_price / 100}</b>
				</p>
				<p>
					Rating: <b>{tutor_rating}</b>
				</p>
				<p>
					Actual students count: <b>{student_count}</b>
				</p>
				<p>
					Sessions summary: <b>{session_count}</b>
				</p>
			</div>

			<div className={cn(s.tableCont, infoVisible ? s.show : s.hide)}>
				<table
					ref={tableRef}
					className={s.table}
				>
					{item.pro_course_detail.map((cource) => (
						<tbody key={cource.language}>
							<tr className={s.divider}>
								<span>
									Language:{' '}
									<span className={s.language}>{cource.language}</span>
								</span>
								<span>
									Course Level:{' '}
									<span className={s.language}>
										{cource.level_lower_limit} - {cource.level_up_limit}
									</span>
								</span>
							</tr>
							{cource.price_list.map((price) => {
								const sessionCalcPrice =
									price.session_price / 100 / price.session_length

								const packageCalcPrice =
									price.package_price / 100 / price.package_length

								return (
									<tr>
										<td
											className={cn(
												filtersPriceFrom / 100 < sessionCalcPrice &&
													filtersPriceTo / 100 > sessionCalcPrice &&
													s.priceMatch,
											)}
										>
											<b>Session</b>
											<tr className={s.info}>
												<span>
													Price: <b>$ {price.session_price / 100}</b>
												</span>
												<span>
													Length : <b>{price.session_length} h.</b>
												</span>
												<span>
													Per Hour:
													<b>${sessionCalcPrice.toFixed(2)}</b>
												</span>
											</tr>
										</td>
										<td
											className={cn(
												filtersPriceFrom / 100 < packageCalcPrice &&
													filtersPriceTo / 100 > packageCalcPrice &&
													s.priceMatch,
											)}
										>
											<b>Package</b>
											<tr className={s.info}>
												<span>
													Price: <b>$ {price.package_price / 100}</b>
												</span>
												<span>
													Length : <b>{price.package_length} h.</b>
												</span>
												<span>
													Per Hour:
													<b>${packageCalcPrice.toFixed(2)}</b>
												</span>
											</tr>
										</td>
									</tr>
								)
							})}
						</tbody>
					))}
				</table>
			</div>

			<button
				onClick={() => setInfoVisible((p) => !p)}
				className={s.button}
			>
				Show Package's Info {infoVisible ? '⬆️' : '⬇️'}
			</button>
		</div>
	)
}
