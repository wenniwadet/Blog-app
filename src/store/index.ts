import { configureStore } from '@reduxjs/toolkit'

import articlesReducer from './articlesSlice'
import userReducer from './userSlice'
import statusReduces from './statusSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    articles: articlesReducer,
    status: statusReduces,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
