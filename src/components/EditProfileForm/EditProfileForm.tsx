import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import InputForm from '../InputForm'
import { validateEmail, validateUrl } from '../../utils/validationHelpers'
import FormField from '../FormField'

import styles from './EditProfileForm.module.scss'

export type DataEditForm = {
  username: string
  email: string
  password: string
  image: string
}

type EditProfileFormProps = {
  email: string
  username: string
  image: string
  responseError: Record<string, string>
  onSubmit: (data: DataEditForm | null) => void
}

const EditProfileForm: FC<EditProfileFormProps> = ({
  email,
  username,
  image,
  responseError,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    setError,
    formState: { errors, isDirty },
  } = useForm<DataEditForm>({
    mode: 'onBlur',
    defaultValues: {
      email,
      username,
      image,
    },
  })

  useEffect(() => {
    if (responseError.username) {
      setError('username', {
        type: 'server',
        message: 'Это имя пользователя уже существует',
      })
    }

    if (responseError.email) {
      setError('email', {
        type: 'server',
        message: 'Этот почтовый адрес уже существует',
      })
    }
  }, [responseError, setError])

  useEffect(() => {
    reset({ email, username, image })
  }, [username, email, image, reset])

  const handleFormSubmit = (data: DataEditForm) => {
    if (isDirty) {
      onSubmit(data)
    } else {
      onSubmit(null)
    }
  }

  const validateEmptyField = (value: string) => (value ? true : 'Поле не может быть пустым')

  return (
    <FormField titleForm="Редактирование профиля" titleButton="Сохранить" formId="editing">
      <form
        className={styles.editProfileForm}
        id="editing"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <InputForm
          name="username"
          type="text"
          label="Имя пользователя"
          placeholder="Имя пользователя"
          register={register}
          getValues={getValues}
          errors={errors}
          validation={{
            validate: {
              empty: (value: string) => (value ? true : 'Поле не может быть пустым'),
            },
            minLength: { value: 3, message: 'Псевдоним должен состоять из 3-20 символов' },
            maxLength: { value: 20, message: 'Псевдоним должен состоять из 3-20 символов' },
          }}
        />

        <InputForm
          name="email"
          type="email"
          label="Почтовый адрес"
          placeholder="Почта"
          register={register}
          getValues={getValues}
          errors={errors}
          validation={{
            validate: {
              validateEmail,
              empty: validateEmptyField,
            },
          }}
        />

        <InputForm
          name="password"
          type="password"
          label="Новый пароль"
          placeholder="Новый пароль"
          register={register}
          getValues={getValues}
          errors={errors}
          validation={{
            minLength: { value: 6, message: 'Пароль должен состоять из 6-40 символов' },
            maxLength: { value: 40, message: 'Пароль должен состоять из 6-40 символов' },
          }}
        />

        <InputForm
          name="image"
          type="url"
          label="Изображение аватара (ссылка)"
          placeholder="Ссылка на изображение"
          register={register}
          getValues={getValues}
          errors={errors}
          validation={{
            validate: validateUrl,
          }}
        />
      </form>
    </FormField>
  )
}

export default EditProfileForm
