import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import useAuth from '../../hooks/useAuth'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { removeUser } from '../../store/userSlice'
import User from '../User'

import styles from './Header.module.scss'

const Header: FC = () => {
  const { isAuth, username, image } = useAuth()

  const dispatch = useAppDispatch()

  const handleLogOut = () => {
    dispatch(removeUser())
    localStorage.removeItem('token')
    window.location.reload()
  }

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Link to="/">
          <h1 className={styles.header__logo}>Realworld Blog</h1>
        </Link>

        {!isAuth && (
          <div className={styles.header__btn_group}>
            <Link to="/sign-in">
              <button
                type="button"
                className={`${styles.header__button} ${styles.header__button__signin}`}
              >
                Войти
              </button>
            </Link>

            <Link to="/sign-up">
              <button
                type="button"
                className={`${styles.header__button} ${styles.header__button__signup}`}
              >
                Регистрация
              </button>
            </Link>
          </div>
        )}

        {isAuth && (
          <div className={styles.header__group}>
            <Link to="new-article">
              <button
                type="button"
                className={`${styles.header__button} ${styles.header__button__create}`}
              >
                Новая статья
              </button>
            </Link>

            <User image={image as string} username={username as string} />
            <Link className="link" to="/">
              <button
                type="button"
                onClick={handleLogOut}
                className={`${styles.header__button} ${styles.header__button__logout}`}
              >
                Выйти
              </button>
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
