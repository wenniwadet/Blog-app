import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'

import api from '../../api/api'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { setUser } from '../../store/userSlice'
import EditProfileForm from '../EditProfileForm'
import { setError, setMessage } from '../../store/statusSlice'
import type { DataEditForm } from '../EditProfileForm/EditProfileForm'

const ProfileEditPage: React.FC = () => {
  const [responseError, setResponseError] = useState<Record<string, string>>({})
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector((state) => state.user)

  const onSubmit = async (data: DataEditForm | null) => {
    if (!data) return navigate('/')

    const filteredData = Object.entries(data).filter(([key, value]) => {
      if (key === 'email') {
        return value !== user.email
      }
      if (key === 'username') {
        return value !== user.username
      }
      if (key === 'image') {
        return value !== user.image
      }
      return value
    })

    if (!filteredData.length) return navigate('/')

    const formData = Object.fromEntries(filteredData)
    try {
      const { username, email, image, token } = await api.user.changeProfileUser(formData)
      dispatch(setUser({ username, email, image }))
      dispatch(setMessage('Профиль был успешно отредактирован'))
      localStorage.setItem('token', token)
      navigate('/')
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        if (err.response.status === 404) {
          dispatch(setError('Не удалось сохранить изменения, повторите пожалуйста позднее'))
        }
        setResponseError(err.response.data.errors)
      } else {
        dispatch(setError('Не удалось сохранить изменения, повторите пожалуйста позднее'))
      }
    }
  }

  return (
    <EditProfileForm
      email={user.email as string}
      username={user.username as string}
      image={user.image as string}
      onSubmit={onSubmit}
      responseError={responseError}
    />
  )
}

export default ProfileEditPage
