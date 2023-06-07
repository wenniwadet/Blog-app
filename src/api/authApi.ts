import axios from 'axios'

import { DataRegistration, DataLogin, UserResponse } from './type'

const instance = axios.create({
  baseURL: 'https://blog.kata.academy/api',
})

export const loginUser = async (data: DataLogin) => {
  const res = await instance.post<UserResponse>('/users/login', { user: data })
  return res.data.user
}

export const registerUser = async (data: DataRegistration) => {
  const res = await instance.post<UserResponse>('/users', {
    user: data,
  })

  return res.data.user
}
