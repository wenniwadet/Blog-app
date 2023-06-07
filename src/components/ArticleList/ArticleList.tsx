import { Pagination } from 'antd'

import type { Article as ArticleType } from '../../api/type'
import Article from '../Article'

import styles from './ArticleList.module.scss'

type ArticleListProps = {
  list: ArticleType[]
  totalArticles: number
  currentPage: number
  onChangePage: (page: number) => void
  onClickLike: (slug: string, favorited: boolean) => Promise<void>
}

const ArticleList: React.FC<ArticleListProps> = ({
  list,
  totalArticles,
  currentPage,
  onChangePage,
  onClickLike,
}) => {
  return (
    <section className={styles.articleList}>
      <ul className={styles.articleList__list}>
        {list.map((article) => (
          <li key={article.slug}>
            <Article
              title={article.title}
              favoritesCount={article.favoritesCount}
              tagList={article.tagList}
              description={article.description}
              favorited={article.favorited}
              slug={article.slug}
              author={article.author}
              createdAt={article.createdAt}
              body={article.body}
              updatedAt={article.updatedAt}
              onClickLike={onClickLike}
              isPreview
            />
          </li>
        ))}
      </ul>
      <Pagination
        pageSize={5}
        total={totalArticles}
        current={currentPage}
        className={styles.articleList__pagination}
        onChange={onChangePage}
        showSizeChanger={false}
        hideOnSinglePage
      />
    </section>
  )
}

export default ArticleList
