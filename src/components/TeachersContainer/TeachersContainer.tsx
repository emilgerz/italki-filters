import { Teacher } from '../../utils/types/schemas'
import { TeacherItem } from '../TeacherItem/TeacherItem'
import s from './TeachersContainer.module.scss'

interface TeachersContaierProps {
	teachers: Teacher[]
}

export const TeachersContainer = ({ teachers }: TeachersContaierProps) => {
	return (
		<div className={s.container}>
			{teachers.map((teacher) => (
				<TeacherItem
					item={teacher}
					key={teacher.user_info.nickname}
				/>
			))}
		</div>
	)
}
