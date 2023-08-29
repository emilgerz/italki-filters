export type Language = string
export type CountryId = string

export type Teacher = {
	user_info: {
		user_id: number
		nickname: string
		avatar_file_name: string
		origin_country_id: string
		living_country_id: string
		origin_city_name: string
		living_city_name: string
		timezone: string
	}
	teacher_info: {
		teach_language: { language: Language; level: number }[]
		also_speak: { language: Language; level: number }[]
		pro_rating: string
		tutor_rating: string
		overall_rating: string
		is_new: number
		free_trial: number
		about_me: string
		is_student_full: number
		student_count: number
		available_time: string
	}
	course_info: {
		trial_price: number
		min_price: number
	}
}
