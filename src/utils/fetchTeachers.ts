import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchTeachers = createAsyncThunk('teachers/fetchTeachers', () =>
	fetch('http://localhost:3000/teachers').then((ok) => ok.json()),
)

// fetchTeachers.pending.toString() == "teachers/fetchTeachers/pending"

// function createAsyncThunk(prefix, cb) {
// 	return () => (dispatch) => {
// 		dispatch({ type: prefix + "/pending" })
// 		cb().then(
// 			(payload) => {
// 				dispatch({ type: prefix + "/fulfilled", payload })
// 			},
// 			() => {
// 				dispatch({ type: prefix + "/rejected" })
// 			},
// 	}
// }

// const fetchUserById = createAsyncThunk(
//   'users/fetchByIdStatus',
//   async (userId: number, thunkAPI) => {
//     const response = await userAPI.fetchById(userId)
//     return response.data
//   }
// )

// export const fetchTeachers = () => {
// 	return (dispatch: (f: unknown) => void) => {
// 		fetch('http://localhost:3000/teachers')
// 			.then((ok) => ok.json())
// 			.then((res) => dispatch(teachersSlice.actions.setTeachers(res)))
// 	}
// }
