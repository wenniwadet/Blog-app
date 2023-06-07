import styles from './ArticleFormField.module.scss'

type ArticleFormFieldProps = {
  title: string
  children: JSX.Element
}

const ArticleFormField: React.FC<ArticleFormFieldProps> = ({ children, title }) => {
  return (
    <div className={styles.articleFormField}>
      <h3 className={styles.articleFormField__title}>{title}</h3>
      {children}
    </div>
  )
}

export default ArticleFormField
