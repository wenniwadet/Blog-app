import classNames from 'classnames'

import styles from './InputForm.module.scss'

type InputFormProps = {
  name: string
  type: string
  label?: string
  placeholder: string
  register: any
  getValues: any
  errors: any
  validation: Record<string, any>
  successField?: boolean
  id?: string
}

const InputForm: React.FC<InputFormProps> = ({
  name,
  type,
  label,
  placeholder,
  register,
  getValues,
  errors,
  validation,
  successField,
  id,
}) => {
  const inputClasses = classNames({
    [styles.inputForm__field]: true,
    [styles.inputForm__field__error]: errors[name],
    [styles.inputForm__field__success]: getValues(name) && !errors[name] && successField,
  })

  return (
    <label className={styles.inputForm}>
      {label}
      <input
        className={inputClasses}
        type={type}
        placeholder={placeholder}
        id={id}
        {...register(name, validation)}
      />

      {errors[name] && (
        <span className={styles.inputForm__error}>{`${errors[name]?.message}`}</span>
      )}
      {errors[name]?.type === 'required' && (
        <span className={styles.inputForm__error}>Поле обязательно для заполнения</span>
      )}
    </label>
  )
}

export default InputForm
