import { configureStore } from '@reduxjs/toolkit'
import { sortingSlice } from './reducers/sorting'
import { filtersSlice } from './reducers/filters'
import { teachersSlice } from './reducers/teachers'
import {
	TypedUseSelectorHook,
	useDispatch as useDispatchRedux,
	useSelector as useSelectorRedux,
} from 'react-redux'

console.log('😱', sortingSlice.actions.setSorting('lessons'))

export const store = configureStore({
	reducer: {
		teachers: teachersSlice.reducer,
		sorting: sortingSlice.reducer,
		filters: filtersSlice.reducer,
	},
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

type DispatchFunc = () => AppDispatch
export const useDispatch: DispatchFunc = useDispatchRedux
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorRedux
