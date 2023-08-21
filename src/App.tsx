import 'modern-css-reset'
import s from './App.module.scss'
import logo from './assets/img/logo.png'

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

			<div className={s.filtersContainer}>
				{Array.from({ length: 100 }).map((el) => (
					<p>1</p>
				))}
			</div>
		</>
	)
}

export default App
