import {
  getArticles,
  getSingleArticle,
  createNewArticle,
  deleteArticle,
  updateArticle,
  likeArticle,
  deleteLikeArticle,
} from './articleApi'
import { getCurrentUser, getProfileUser, changeProfileUser } from './userApi'
import { loginUser, registerUser } from './authApi'

const api = {
  article: {
    getArticles,
    getSingleArticle,
    createNewArticle,
    updateArticle,
    deleteArticle,
    likeArticle,
    deleteLikeArticle,
  },
  user: {
    getCurrentUser,
    getProfileUser,
    changeProfileUser,
  },

  auth: {
    registerUser,
    loginUser,
  },
}

export default api
