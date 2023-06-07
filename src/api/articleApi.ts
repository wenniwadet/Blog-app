/* eslint-disable no-param-reassign */
import axios from 'axios'

import type { SingleArticleResponse, NewArticle, UpdateArticle } from './type'

const instance = axios.create({
  baseURL: 'https://blog.kata.academy/api',
})

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  config.headers.Authorization = `Bearer ${token}`

  return config
})

export const getArticles = async (offset: number) => {
  const res = await instance.get('/articles', { params: { limit: 5, offset } })
  return res.data
}

export const getSingleArticle = async (slug: string) => {
  const response = await instance.get<SingleArticleResponse>(`/articles/${slug}`)
  return response.data.article
}

export const createNewArticle = async (data: NewArticle) => {
  const response = await instance.post<SingleArticleResponse>('/articles', { article: data })
  return response.data.article
}

export const updateArticle = async (slug: string, data: UpdateArticle) => {
  const response = await instance.put<SingleArticleResponse>(`/articles/${slug}`, {
    article: data,
  })
  return response.data.article
}

export const deleteArticle = async (slug: string) => {
  await instance.delete<string>(`/articles/${slug}`)
}

export const likeArticle = async (slug: string) => {
  const response = await instance.post<SingleArticleResponse>(`/articles/${slug}/favorite`)
  return response.data.article
}

export const deleteLikeArticle = async (slug: string) => {
  const response = await instance.delete<SingleArticleResponse>(`/articles/${slug}/favorite`)
  return response.data.article
}
