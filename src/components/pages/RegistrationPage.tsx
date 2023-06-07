import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'

import type { DataRegForm } from '../RegistrationForm/RegistrationForm'
import RegistrationForm from '../RegistrationForm'
import api from '../../api/api'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { setUser } from '../../store/userSlice'
import { setError } from '../../store/statusSlice'

const RegistrationPage = () => {
  const [responseError, setResponseError] = useState<Record<string, string>>({})
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onSubmit = async ({ cpassword, agree, ...data }: DataRegForm) => {
    try {
      const { email, username, token } = await api.auth.registerUser(data)
      dispatch(setUser({ email, username }))
      localStorage.setItem('token', token)
      navigate('/')
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        if (err.response.status === 404) {
          dispatch(setError('Не удалось сохранить изменения, повторите пожалуйста позднее'))
        } else {
          setResponseError(err.response.data.errors)
        }
      } else {
        dispatch(setError('Не удалось сохранить изменения, повторите пожалуйста позднее'))
      }
    }
  }

  return <RegistrationForm onSubmit={onSubmit} responseError={responseError} />
}

export default RegistrationPage
