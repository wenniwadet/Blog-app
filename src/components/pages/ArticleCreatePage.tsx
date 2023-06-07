import { useNavigate } from 'react-router-dom'

import ArticleForm from '../ArticleForm'
import type { DataArticleForm } from '../ArticleForm/ArticleForm'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { createNewArticle } from '../../store/articlesSlice'
import ArticleFormField from '../ArticleFormField'
import { setMessage } from '../../store/statusSlice'

const ArticleFormPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onSubmit = (data: DataArticleForm) => {
    const filteredTagList = data.tagList.filter((tag) => tag.name)
    const tagList = filteredTagList.map((tag) => tag.name)
    const newArticle = { ...data, tagList }

    dispatch(createNewArticle(newArticle)).then((res) => {
      if (res.meta.requestStatus !== 'rejected') {
        dispatch(setMessage('Статья была успешно cоздана'))
        navigate('/')
      }
    })
  }

  return (
    <ArticleFormField title="Создать новую статью">
      <ArticleForm onSubmit={onSubmit} />
    </ArticleFormField>
  )
}

export default ArticleFormPage
