import { useEffect } from 'react'
import { Checkbox } from 'antd'
import { useForm, Controller } from 'react-hook-form'
import classNames from 'classnames'

import InputForm from '../InputForm/InputForm'
import FormField from '../FormField'
import { validateConfirmPassword, validateEmail } from '../../utils/validationHelpers'

import styles from './RegistrationForm.module.scss'

export type DataRegForm = {
  username: string
  email: string
  password: string
  cpassword: string
  agree: boolean
}

type RegistrationFormProps = {
  onSubmit: (data: DataRegForm) => void
  responseError: Record<string, string>
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSubmit, responseError }) => {
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
    control,
  } = useForm<DataRegForm>({
    mode: 'all',
  })

  useEffect(() => {
    if (responseError.username) {
      setError('username', {
        type: 'server',
        message: 'Это имя пользователя уже занято',
      })
    }

    if (responseError.email) {
      setError('email', {
        type: 'server',
        message: 'Этот почтовый адрес уже занят',
      })
    }
  }, [responseError, setError])

  const checkboxClasses = classNames({
    [styles.registrationForm__agree]: true,
    [styles.registrationForm__agree__error]: errors.agree,
  })

  return (
    <FormField
      titleForm="Создайте новый аккаунт"
      titleButton="Создать"
      formId="registration"
      link="signIn"
    >
      <form className={styles.registrationForm} id="registration" onSubmit={handleSubmit(onSubmit)}>
        <InputForm
          name="username"
          type="text"
          label="Имя пользователя"
          placeholder="Имя пользователя"
          register={register}
          getValues={getValues}
          errors={errors}
          validation={{
            required: true,
            minLength: { value: 3, message: 'Псевдоним должен состоять из 3-20 символов' },
            maxLength: { value: 20, message: 'Псевдоним должен состоять из 3-20 символов' },
          }}
          successField
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
            required: true,
            validate: validateEmail,
          }}
          successField
        />

        <InputForm
          name="password"
          type="password"
          label="Пароль"
          placeholder="Пароль"
          register={register}
          getValues={getValues}
          errors={errors}
          validation={{
            required: true,
            minLength: { value: 6, message: 'Пароль должен состоять из 6-40 символов' },
            maxLength: { value: 40, message: 'Пароль должен состоять из 6-40 символов' },
          }}
          successField
        />

        <InputForm
          name="cpassword"
          type="password"
          label="Повторите пароль"
          placeholder="Пароль"
          register={register}
          getValues={getValues}
          errors={errors}
          validation={{
            required: true,
            validate: validateConfirmPassword,
          }}
          successField
        />
      </form>

      <div className={checkboxClasses}>
        <Controller
          control={control}
          name="agree"
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <Checkbox
              checked={value}
              onChange={(e) => {
                onChange(e.target.checked)
              }}
            />
          )}
        />
        <span>
          Я согласен на обработку моей личной информации
          {errors.agree && (
            <span className={styles.registrationForm__error}>
              Подтвердите свое согласие на обработку персональных данных
            </span>
          )}
        </span>
      </div>
    </FormField>
  )
}

export default RegistrationForm
