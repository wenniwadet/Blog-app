import { Link } from 'react-router-dom'

import styles from './FormField.module.scss'

type FormFieldProps = {
  children: JSX.Element | JSX.Element[]
  titleForm: string
  titleButton: string
  formId: string
  link?: 'signIn' | 'signUp'
}

const FormField: React.FC<FormFieldProps> = ({
  children,
  titleButton,
  titleForm,
  formId,
  link,
}) => {
  const signUp = (
    <span className={styles.formField__question}>
      {'У вас нет аккаунта? '}
      <Link className={`link ${styles.formField__link}`} to="/sign-up">
        Зарегистрироваться
      </Link>
    </span>
  )

  const signIn = (
    <span className={styles.formField__question}>
      {'У вас уже есть аккаунт? '}
      <Link className={`link ${styles.formField__link}`} to="/sign-in">
        Войти
      </Link>
    </span>
  )

  return (
    <div className={styles.formField}>
      <h3 className={styles.formField__title}>{titleForm}</h3>
      {children}
      <div className={styles.formField__submit}>
        <button className={styles.formField__button} type="submit" form={formId}>
          {titleButton}
        </button>
        {link === 'signIn' && signIn}
        {link === 'signUp' && signUp}
      </div>
    </div>
  )
}

export default FormField
