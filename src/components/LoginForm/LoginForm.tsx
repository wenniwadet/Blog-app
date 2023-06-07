import { useForm } from 'react-hook-form'

import InputForm from '../InputForm'
import { validateEmail } from '../../utils/validationHelpers'
import FormField from '../FormField'

import styles from './LoginForm.module.scss'

export type DataLoginForm = {
  email: string
  password: string
}

type LoginFormProps = {
  onSubmit: (data: DataLoginForm) => void
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<DataLoginForm>({
    mode: 'onBlur',
  })

  return (
    <FormField titleForm="Войти в аккаунт" titleButton="Войти" formId="login" link="signUp">
      <form className={styles.loginForm} id="login" onSubmit={handleSubmit(onSubmit)}>
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
        />
      </form>
    </FormField>
  )
}

export default LoginForm
