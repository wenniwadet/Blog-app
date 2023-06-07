import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'
import { DeleteTwoTone } from '@ant-design/icons'
import { Typography, Popconfirm } from 'antd'
import classNames from 'classnames'

import type { Article as ArticleType } from '../../api/type'
import ArticleHeader from '../ArticleHeader'
import User from '../User'

import styles from './Article.module.scss'

type ArticleProps = {
  onClickLike: (slug: string, favorited: boolean) => Promise<void>
  isMyArticle?: boolean
  isPreview?: boolean
  onConfirmDelete?: () => void
} & ArticleType

const Article: React.FC<ArticleProps> = ({
  title,
  description,
  tagList,
  body,
  slug,
  favoritesCount,
  favorited,
  createdAt,
  author,
  isMyArticle,
  isPreview,
  onConfirmDelete,
  onClickLike,
}) => {
  const articleClasses = classNames({
    [styles.article]: true,
    [styles.article__preview]: isPreview,
  })

  return (
    <article className={articleClasses}>
      <div className={styles.article__header}>
        <ArticleHeader
          title={title}
          tags={tagList}
          description={description}
          likes={favoritesCount}
          favorited={favorited}
          slug={slug}
          isPreview={isPreview}
          onClickLike={onClickLike}
        />
        <div className={styles.article__user}>
          <User image={author.image} username={author.username} createdAt={createdAt} />

          {isMyArticle && !isPreview ? (
            <div className={styles.article__btn_container}>
              <Popconfirm
                placement="bottom"
                icon={<DeleteTwoTone style={{ fontSize: 20 }} />}
                description="Вы уверены, что хотите удалить статью?"
                onConfirm={onConfirmDelete}
                title=""
                okText="Да"
                cancelText="Нет"
              >
                <button className={styles.article__btn__danger} type="button">
                  Удалить
                </button>
              </Popconfirm>

              <Link to="edit">
                <button className={styles.article__btn__success} type="button">
                  Редактировать
                </button>
              </Link>
            </div>
          ) : null}
        </div>
      </div>

      {!isPreview && (
        <Typography.Paragraph className={styles.article__body}>
          <ReactMarkdown className={styles.article__text}>{body}</ReactMarkdown>
        </Typography.Paragraph>
      )}
    </article>
  )
}

export default Article
