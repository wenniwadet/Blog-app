import { useState } from 'react'
import { Typography } from 'antd'
import classNames from 'classnames'
import { Link, useLocation } from 'react-router-dom'

import useAuth from '../../hooks/useAuth'

import styles from './ArticleHeader.module.scss'

type ArticleHeaderProps = {
  title: string
  likes: number
  tags: string[]
  description: string
  favorited: boolean
  slug: string
  isPreview?: boolean
  onClickLike: (slug: string, favorited: boolean) => Promise<void>
}

const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  title,
  likes,
  tags,
  description,
  favorited,
  slug,
  isPreview,
  onClickLike,
}) => {
  const [disabled, setDisabled] = useState<boolean>(false)
  const { isAuth } = useAuth()

  const titleClasses = classNames({
    [styles.articleHeader__title]: true,
    [styles.articleHeader__title__full]: !isPreview,
  })

  const btnLikeClasses = classNames({
    [styles.articleHeader__btn_like]: true,
    [styles.articleHeader__btn_like__active]: favorited,
  })

  const tagClasses = classNames({
    [styles.articleHeader__tag]: true,
    [styles.articleHeader__tag__light]: !isPreview,
  })

  const location = useLocation()
  const fromPage = location.pathname === '/' ? '/articles/1' : location.pathname

  const filteredTagList = tags.filter((tag) => tag !== '')
  const tagList = filteredTagList.map((tag, idx) => {
    if (idx > 4 && isPreview) return
    return (
      <span key={Math.random()} className={tagClasses}>
        {tag}
      </span>
    )
  })

  const handleClickLike = async () => {
    if (!isAuth) return
    setDisabled(true)
    await onClickLike(slug, favorited)
    setDisabled(false)
  }

  return (
    <div className={styles.articleHeader}>
      <div className={styles.articleHeader__title_container}>
        <h3 className={titleClasses}>
          {isPreview ? <Link to={`${fromPage}/${slug}`}>{title}</Link> : title}
        </h3>

        <button
          type="button"
          className={btnLikeClasses}
          disabled={disabled}
          onClick={handleClickLike}
        >
          {likes}
        </button>
      </div>
      <div className={styles.articleHeader__tags}>{tagList}</div>
      <Typography.Paragraph
        style={{ color: isPreview ? '#404040' : '#808080' }}
        className={styles.articleHeader__description}
        ellipsis={isPreview ? { rows: 2 } : false}
      >
        {description}
      </Typography.Paragraph>
    </div>
  )
}

export default ArticleHeader
