/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import classNames from 'classnames'

import InputForm from '../InputForm'
import type { Article } from '../../api/type'

import styles from './ArticleForm.module.scss'

export type DataArticleForm = {
  title: string
  description: string
  body: string
  tagList: { name: string }[]
}

type ArticleFormProps = {
  article?: Article | null
  onSubmit: (data: DataArticleForm) => void
}

const ArticleForm: React.FC<ArticleFormProps> = ({ onSubmit, article }) => {
  const {
    register,
    handleSubmit,
    getValues,
    clearErrors,
    setFocus,
    reset,
    control,
    formState: { errors },
  } = useForm<DataArticleForm>({
    mode: 'onTouched',
    defaultValues: {
      title: article?.title,
      description: article?.description,
      body: article?.body,
      tagList: article ? article?.tagList.map((tag) => ({ name: tag })) : [{ name: '' }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  })

  const [addedTags, setAddedTags] = useState<string[]>([])

  const [customError, setCustomError] = useState<string | null>(null)

  useEffect(() => {
    if (article) {
      reset({
        title: article.title,
        description: article.description,
        body: article.body,
        tagList:
          article.tagList.length === 0
            ? [{ name: '' }]
            : article?.tagList.map((tag) => ({ name: tag })),
      })
    }
  }, [article, reset])

  useEffect(() => {
    setAddedTags([])
  }, [])

  useEffect(() => {
    const idx = fields.length - 1

    if (fields[idx]?.name === '') return

    if (article?.tagList.length) {
      const tags = fields.map((field) => field.id)
      setAddedTags(tags)
    }
  }, [article, fields])

  useEffect(() => {
    clearErrors('tagList')
  }, [addedTags, clearErrors])

  const handleRemoveTag = (index: number, id: string) => {
    if (fields.length === 1) {
      reset({ tagList: [{ name: '' }] })
      setTimeout(() => setAddedTags([]))
    } else {
      remove(index)
      clearErrors('tagList')
      setAddedTags((state) => state.filter((tag) => tag !== id))
    }
  }

  const handleAddMoreTag = () => {
    const idx = fields.length - 1
    if (errors.tagList?.[idx]) {
      setFocus(`tagList.${idx}.name`)
    } else if (fields.length !== addedTags.length || getValues(`tagList.${idx}.name`) === '') {
      setCustomError('Сначала добавьте этот тег')
      setFocus(`tagList.${idx}.name`)
    } else {
      append({ name: '' })
      setCustomError(null)
    }
  }

  const handleAddTag = (index: number, id: string) => {
    if (errors.tagList?.[index]) {
      setCustomError(null)
      setFocus(`tagList.${index}.name`)
    } else if (getValues(`tagList.${index}.name`) && !errors.tagList?.[index]) {
      setAddedTags((state) => [...state, id])
      setCustomError(null)
    } else if (getValues(`tagList.${index}.name`) && !customError) {
      setAddedTags((state) => [...state, id])
      setCustomError(null)
    } else {
      setCustomError('Нельзя добавить пустой тег')
      setFocus(`tagList.${index}.name`)
    }
  }

  const handleFormSubmit = (data: DataArticleForm) => {
    const idx = fields.length - 1

    if (getValues(`tagList.${idx}.name`) && fields.length !== addedTags.length) {
      setCustomError('Сначала добавьте этот тег')
      setFocus(`tagList.${idx}.name`)
    } else {
      onSubmit(data)
    }
  }

  const textClasses = classNames({
    [styles.articleForm__text]: true,
    [styles.articleForm__text__error]: !!errors.body,
  })

  return (
    <form className={styles.articleForm} id="new-article" onSubmit={handleSubmit(handleFormSubmit)}>
      <InputForm
        name="title"
        type="text"
        label="Заголовок"
        placeholder="Заголовок"
        register={register}
        getValues={getValues}
        errors={errors}
        validation={{
          required: true,
          maxLength: {
            value: 100,
            message: 'Заголовок не должен превышать 100 символов',
          },
        }}
      />
      <InputForm
        name="description"
        type="text"
        label="Краткое описание"
        placeholder="Описание"
        register={register}
        getValues={getValues}
        errors={errors}
        validation={{
          required: true,
        }}
      />
      <label className={styles.articleForm__label}>
        Текст статьи
        <textarea
          className={textClasses}
          placeholder="Текст статьи"
          {...register('body', {
            required: {
              value: true,
              message: 'Это поле обязательно для заполнения',
            },
          })}
        />
        {errors.body && <span className={styles.articleForm__error}>{errors.body.message}</span>}
      </label>

      <div className={styles.articleForm__label}>
        Теги
        <div className={styles.articleForm__container}>
          {fields.map((field, index) => {
            return (
              <div className={styles.articleForm__tags} key={field.id}>
                <div className={styles.articleForm__fields}>
                  <InputForm
                    name={`tagList.${index}.name`}
                    type="text"
                    placeholder="Тег"
                    register={register}
                    getValues={getValues}
                    errors={errors}
                    id="tagList"
                    validation={{
                      maxLength: {
                        value: 30,
                        message: 'Тег не должен превышать 30 символов',
                      },
                    }}
                  />
                </div>

                {addedTags.some((tag) => tag === field.id) && (
                  <span className={styles.articleForm__status}>✔</span>
                )}

                {!addedTags.some((tag) => tag === field.id) && (
                  <button
                    className={styles.articleForm__btn__add}
                    type="button"
                    onClick={() => handleAddTag(index, field.id)}
                  >
                    Добавить
                  </button>
                )}

                {(addedTags.some((tag) => tag === field.id) ||
                  (fields.length - 1 === index && index !== 0)) && (
                  <button
                    className={styles.articleForm__btn__delete}
                    type="button"
                    onClick={() => handleRemoveTag(index, field.id)}
                  >
                    ✕
                  </button>
                )}
              </div>
            )
          })}
          {customError && <span className={styles.articleForm__error}>{customError}</span>}
          {errors.tagList?.[fields.length - 1] && (
            <span className={styles.articleForm__error}>
              {errors.tagList?.[fields.length - 1]?.name?.message}
            </span>
          )}
        </div>
      </div>

      <button
        className={styles.articleForm__btn__more}
        type="button"
        onClick={() => handleAddMoreTag()}
      >
        Добавить еще
      </button>

      <button className={styles.articleForm__send} type="submit">
        Отправить
      </button>
    </form>
  )
}

export default ArticleForm
