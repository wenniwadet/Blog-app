/* eslint-disable no-param-reassign */
import { AnyAction, PayloadAction, createSlice } from '@reduxjs/toolkit'

type StatusState = {
  loading: boolean
  error: null | string
  message: null | string
}

const initialState: StatusState = {
  loading: false,
  error: null,
  message: null,
}

const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload
      state.loading = false
    },
    deleteError(state) {
      state.error = null
    },
    setMessage(state, action: PayloadAction<string>) {
      state.message = action.payload
    },
    deleteMessage(state) {
      state.message = null
    },
  },

  extraReducers(builder) {
    builder
      .addMatcher(
        (action: AnyAction) => {
          return action.type.endsWith('rejected')
        },
        (state, action: PayloadAction<string>) => {
          state.error = action.payload
          state.loading = false
        }
      )
      .addMatcher(
        (action: AnyAction) => {
          if (
            action.type.startsWith('articles/getArticles') ||
            action.type.startsWith('articles/getSingleArticle')
          ) {
            return action.type.endsWith('pending')
          }
          return false
        },
        (state) => {
          state.loading = true
        }
      )
      .addMatcher(
        (action: AnyAction) => {
          return action.type.endsWith('fulfilled')
        },
        (state) => {
          state.loading = false
        }
      )
  },
})

export const { setError, deleteError, setMessage, deleteMessage } = statusSlice.actions

export default statusSlice.reducer
