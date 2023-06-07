import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { getArticles, likeArticle, deleteLikeArticle } from '../../store/articlesSlice'
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks'
import ArticleList from '../ArticleList'

const ArticlesPage = () => {
  const { pages } = useParams()
  const { list, totalArticles, currentPage } = useAppSelector((state) => state.articles)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!pages) {
      dispatch(getArticles([1, 0]))
    } else {
      const pageNum = +pages
      const offset = pageNum === 1 ? 0 : 5 * (pageNum - 1)
      const pagination: [number, number] = [pageNum, offset]

      dispatch(getArticles(pagination))
    }
  }, [pages, dispatch])

  const handleChangePage = (page: number) => {
    navigate(`/articles/${page}`)
  }

  const handleClickLike = async (slug: string, favorited: boolean) => {
    if (!favorited) {
      await dispatch(likeArticle(slug))
    } else {
      await dispatch(deleteLikeArticle(slug))
    }
  }

  return (
    <ArticleList
      list={list}
      totalArticles={totalArticles}
      onChangePage={handleChangePage}
      currentPage={currentPage}
      onClickLike={handleClickLike}
    />
  )
}

export default ArticlesPage
