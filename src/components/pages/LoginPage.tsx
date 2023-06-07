import { useLocation, useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'

import { useAppDispatch } from '../../hooks/reduxHooks'
import api from '../../api/api'
import LoginForm from '../LoginForm'
import type { DataLoginForm } from '../LoginForm/LoginForm'
import { setUser } from '../../store/userSlice'
import { setError } from '../../store/statusSlice'

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const fromPage = location.state?.from || '/'

  const onSubmit = async (data: DataLoginForm): Promise<void> => {
    try {
      const { username, email, image, token } = await api.auth.loginUser(data)
      dispatch(setUser({ username, email, image }))
      localStorage.setItem('token', token)

      navigate(fromPage, { replace: true })
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        if (err.response.status === 404) {
          dispatch(setError('Не удалось отправить данные, повторите пожалуйста позднее'))
        } else {
          dispatch(setError('Указан неверный пароль или email-адрес'))
        }
      } else {
        dispatch(setError('Не удалось отправить данные, повторите пожалуйста позднее'))
      }
    }
  }

  return <LoginForm onSubmit={onSubmit} />
}

export default LoginPage
