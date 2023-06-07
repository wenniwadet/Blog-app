import { Outlet } from 'react-router-dom'
import { ToastContainer, toast, ToastOptions } from 'react-toastify'
import { useEffect } from 'react'

import Header from '../Header'
import Spinner from '../Spinner'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { deleteError, deleteMessage } from '../../store/statusSlice'
import api from '../../api/api'
import { setUser } from '../../store/userSlice'

import 'react-toastify/dist/ReactToastify.min.css'
import styles from './Layout.module.scss'

const Layout = () => {
  const { loading, error, message } = useAppSelector((state) => state.status)
  const dispatch = useAppDispatch()

  const generalToastConfig: ToastOptions = {
    position: 'top-center',
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  }

  useEffect(() => {
    if (error) {
      toast(error, {
        autoClose: 5000,
        type: 'error',
        ...generalToastConfig,
      })
      setTimeout(() => {
        dispatch(deleteError())
      }, 6000)
    }
  }, [error, dispatch])

  useEffect(() => {
    if (message) {
      toast(message, {
        autoClose: 3000,
        type: 'success',
        ...generalToastConfig,
      })
      setTimeout(() => {
        dispatch(deleteMessage())
      }, 4000)
    }
  }, [message, dispatch])

  useEffect(() => {
    const checkToken = async () => {
      if (localStorage.getItem('token')) {
        try {
          const user = await api.user.getCurrentUser()
          dispatch(
            setUser({
              email: user.email,
              username: user.username,
              image: user.image,
            })
          )
          localStorage.setItem('token', user.token)
        } catch (err) {
          localStorage.removeItem('token')
        }
      }
    }

    checkToken()
  }, [dispatch])

  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.layout__container}>
        {loading && <Spinner />}
        <Outlet />
        <ToastContainer style={{ width: 300, top: '3em' }} />
      </main>
    </div>
  )
}

export default Layout
