/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '../api/api'
import type { NewArticle, UpdateArticle, ArticlesResponse, Article } from '../api/type'

type GetArticlesRes = { currentPage: number } & ArticlesResponse
type Pagination = [number, number]

type UpdateArticleThunk = {
  slug: string
  data: UpdateArticle
}

export const getArticles = createAsyncThunk<GetArticlesRes, Pagination, { rejectValue: string }>(
  'articles/getArticles',
  async ([page, offset], { rejectWithValue }) => {
    try {
      const { articles, articlesCount } = await api.article.getArticles(offset)

      return {
        articles,
        articlesCount,
        currentPage: page,
      }
    } catch (error) {
      return rejectWithValue('Не удалось загрузить статьи, попробуйте обновить страницу')
    }
  }
)

export const getSingleArticle = createAsyncThunk<Article, string, { rejectValue: string }>(
  'articles/getSingleArticle',
  async (slug, { rejectWithValue }) => {
    try {
      const res = await api.article.getSingleArticle(slug)
      return res
    } catch (error) {
      return rejectWithValue('Не удалось загрузить статью, попробуйте обновить страницу')
    }
  }
)

export const createNewArticle = createAsyncThunk<Article, NewArticle, { rejectValue: string }>(
  'articles/createNewArticle',
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.article.createNewArticle(data)
      return res
    } catch (error) {
      return rejectWithValue('Не удалось создать статью, повторите пожалуйста позднее')
    }
  }
)

export const updateArticle = createAsyncThunk<Article, UpdateArticleThunk, { rejectValue: string }>(
  'articles/updateArticle',
  async ({ slug, data }, { rejectWithValue }) => {
    try {
      const res = await api.article.updateArticle(slug, data)
      return res
    } catch (error) {
      return rejectWithValue('Не удалось сохранить изменения, повторите пожалуйста позднее')
    }
  }
)

export const deleteArticle = createAsyncThunk<void, string, { rejectValue: string }>(
  'articles/deleteArticle',
  async (slug, { rejectWithValue }) => {
    try {
      await api.article.deleteArticle(slug)
    } catch (error) {
      return rejectWithValue('Не удалось удалить статью, повторите пожалуйста позднее')
    }
  }
)

export const likeArticle = createAsyncThunk<Article, string, { rejectValue: string }>(
  'articles/likeArticle',
  async (slug, { rejectWithValue }) => {
    try {
      const res = await api.article.likeArticle(slug)
      return res
    } catch (error) {
      return rejectWithValue('Произошла ошибка с сервером, повторите пожалуйста позднее')
    }
  }
)

export const deleteLikeArticle = createAsyncThunk<Article, string, { rejectValue: string }>(
  'articles/deleteLikeArticle',
  async (slug, { rejectWithValue }) => {
    try {
      const res = await api.article.deleteLikeArticle(slug)
      return res
    } catch (error) {
      return rejectWithValue('Произошла ошибка с сервером, повторите пожалуйста позднее')
    }
  }
)

function changeLikeArticle(state: ArticlesState, action: PayloadAction<Article>) {
  if (state.selectedArticle) {
    state.selectedArticle = action.payload
  } else {
    state.list = state.list.map((article) => {
      return article.slug === action.payload.slug ? action.payload : article
    })
  }
}

type ArticlesState = {
  list: Article[]
  selectedArticle: Article | null
  totalArticles: number
  currentPage: number
}

const initialState: ArticlesState = {
  list: [],
  selectedArticle: null,
  totalArticles: 0,
  currentPage: 1,
}

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    removeArticle(state) {
      state.selectedArticle = null
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getArticles.fulfilled, (state, action) => {
        state.list = action.payload.articles
        state.totalArticles = action.payload.articlesCount
        state.currentPage = action.payload.currentPage
      })
      .addCase(getSingleArticle.fulfilled, (state, action) => {
        state.selectedArticle = action.payload
        state.list = []
        state.totalArticles = 0
      })

      .addCase(likeArticle.fulfilled, changeLikeArticle)
      .addCase(deleteLikeArticle.fulfilled, changeLikeArticle)
  },
})

export const { removeArticle } = articlesSlice.actions

export default articlesSlice.reducer
