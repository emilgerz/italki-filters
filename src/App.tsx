import 'modern-css-reset'
import s from './App.module.scss'
import logo from './assets/img/logo.png'
import { Filters } from './components/Filters/Filters'
import { TeachersContainer } from './components/TeachersContainer/TeachersContainer'

function App() {
	return (
		<>
			<header className={s.header}>
				<img
					className={s.img}
					src={logo}
				/>

				<p>Find teacher on Italki that fits to you</p>
			</header>

			<div className={s.content}>
				<div className={s.filtersContainer}>
					<Filters />
				</div>

				<div className={s.teachers}>
					<TeachersContainer />
				</div>
			</div>
		</>
	)
}

export default App
