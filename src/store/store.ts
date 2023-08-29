import { configureStore } from '@reduxjs/toolkit'
import { sortingSlice } from './reducers/sorting'
import {
	TypedUseSelectorHook,
	useDispatch as useDispatchRedux,
	useSelector as useSelectorRedux,
} from 'react-redux'

console.log('😱', sortingSlice.actions.setSorting('lessons'))

export const store = configureStore({
	reducer: {
		// teachers,
		sorting: sortingSlice.reducer,
		// filters,
	},
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

type DispatchFunc = () => AppDispatch
export const useDispatch: DispatchFunc = useDispatchRedux
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorRedux
