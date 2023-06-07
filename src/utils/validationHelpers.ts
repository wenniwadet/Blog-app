/* eslint-disable consistent-return */
/* eslint-disable no-useless-escape */
export const validateEmail = (value: string): boolean | string => {
  if (value === '') return true
  const emailReg = /^\S+@\S+\.\S+$/

  return emailReg.test(value) ? true : 'Указан некорректный email-адрес'
}

export const validateConfirmPassword = (value: string, formValues: any): boolean | string => {
  return value === formValues.password ? true : 'Пароли должны совпадать'
}

export const validateUrl = (value: string): boolean | string => {
  if (value === '') return true
  const urlReg =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/

  return urlReg.test(value) ? true : 'Указана некорректная ссылка'
}
