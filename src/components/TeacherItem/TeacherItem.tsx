import { Teacher } from '../../utils/types/schemas'
import s from './TeacherItem.module.scss'
import { countryList } from '../../assets/countryList'

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

	const imgFetch = `https://imagesavatar-static01.italki.com/${avatar_file_name}_Avatar.jpg`

	return (
		<div className={s.teacher}>
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
					Price: <b>{min_price}</b>
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
		</div>
	)
}
