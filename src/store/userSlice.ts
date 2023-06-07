/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type UserState = {
  email: null | string
  username: null | string
  image?: null | string
}

const initialState: UserState = {
  email: null,
  username: null,
  image: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.email = action.payload.email
      state.username = action.payload.username
      state.image = action.payload.image
    },

    removeUser(state) {
      state.email = null
      state.username = null
      state.image = null
    },
  },
})

export const { setUser, removeUser } = userSlice.actions

export default userSlice.reducer
