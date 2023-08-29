import { Teacher } from '../../utils/types/schemas'
import s from './TeacherItem.module.scss'

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
	} = item.user_info
	const { teacher_info } = item

	const imgFetch = `https://imagesavatar-static01.italki.com/${avatar_file_name}_Avatar.jpg`

	return (
		<div className={s.teacher}>
			<div>
				<img src={imgFetch} />

				<p>{nickname}</p>

				<p>
					Lives in {living_city_name}, {living_country_id}
				</p>
				<p>
					Born in {origin_city_name}, {origin_country_id}
				</p>
			</div>

			<div>
				<ul>
					Teachs:
					{teacher_info.teach_language.map(({ language, level }) => (
						<li>
							{language} - level {level}
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}
