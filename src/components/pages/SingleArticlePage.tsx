import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import Article from '../Article'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { setMessage } from '../../store/statusSlice'
import {
  deleteArticle,
  getSingleArticle,
  removeArticle,
  likeArticle,
  deleteLikeArticle,
} from '../../store/articlesSlice'

const SingleArticlePage = () => {
  const dispatch = useAppDispatch()

  const article = useAppSelector((state) => state.articles.selectedArticle)
  const user = useAppSelector((state) => state.user)

  const { id } = useParams()
  const navigate = useNavigate()

  const isMyArticle = article?.author.username === user.username

  const onConfirmDelete = () => {
    if (!article) return
    dispatch(deleteArticle(article.slug))
    dispatch(setMessage('Статья была успешно удалена'))
    navigate('/')
  }

  const handleClickLike = async (slug: string, favorited: boolean) => {
    if (!favorited) {
      await dispatch(likeArticle(slug))
    } else {
      await dispatch(deleteLikeArticle(slug))
    }
  }

  useEffect(() => {
    if (id) {
      dispatch(getSingleArticle(id))
    }
    return () => {
      dispatch(removeArticle())
    }
  }, [id, dispatch])

  if (!article) return null

  return (
    <Article
      {...article}
      isMyArticle={isMyArticle}
      onConfirmDelete={onConfirmDelete}
      onClickLike={handleClickLike}
    />
  )
}

export default SingleArticlePage
