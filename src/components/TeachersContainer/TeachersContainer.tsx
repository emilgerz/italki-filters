import { teachersSelector } from '../../store/reducers/teachers'
import { useSelector } from '../../store/store'
import { TeacherItem } from '../TeacherItem/TeacherItem'
import s from './TeachersContainer.module.scss'

export const TeachersContainer = () => {
	const teachers = useSelector(teachersSelector)

	return (
		<div className={s.container}>
			{teachers.map((teacher) => (
				<TeacherItem
					key={teacher.user_info.user_id}
					item={teacher}
				/>
			))}
		</div>
	)
}
