import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import ArticleForm from '../ArticleForm'
import { DataArticleForm } from '../ArticleForm/ArticleForm'
import ArticleFormField from '../ArticleFormField'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { updateArticle, getSingleArticle } from '../../store/articlesSlice'
import { setMessage } from '../../store/statusSlice'

const ArticleEditPage = () => {
  const dispatch = useAppDispatch()
  const article = useAppSelector((state) => state.articles.selectedArticle)
  const { id, pages } = useParams()
  const navigate = useNavigate()

  const onSubmit = (data: DataArticleForm) => {
    const filteredTagList = data.tagList.filter((tag) => tag.name)
    const tagList = filteredTagList.map((tag) => tag.name)
    const updatedArticle = { ...data, tagList }

    if (article) {
      dispatch(updateArticle({ slug: article.slug, data: updatedArticle })).then((res) => {
        if (res.meta.requestStatus !== 'rejected') {
          dispatch(setMessage('Статья была успешно отредактирована'))
          navigate(`/articles/${pages}/${id}`)
        }
      })
    }
  }

  useEffect(() => {
    if (!id) return
    dispatch(getSingleArticle(id))
  }, [id, dispatch])

  return (
    <ArticleFormField title="Редактирование статьи">
      <ArticleForm onSubmit={onSubmit} article={article} />
    </ArticleFormField>
  )
}

export default ArticleEditPage
