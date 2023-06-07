/* eslint-disable no-param-reassign */
import axios from 'axios'

import type { UserResponse, ProfileResponse, UpdatedProfile } from './type'

const instance = axios.create({
  baseURL: 'https://blog.kata.academy/api',
})

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  config.headers.Authorization = `Bearer ${token}`

  return config
})

export const getCurrentUser = async () => {
  const res = await instance.get<UserResponse>('/user')
  return res.data.user
}

export const getProfileUser = async (username: string) => {
  const res = await instance.get<ProfileResponse>(`/profiles/${username}`)
  return res.data.profile
}

export const changeProfileUser = async (data: UpdatedProfile) => {
  const res = await instance.put<UserResponse>('/user', { user: data })
  return res.data.user
}
