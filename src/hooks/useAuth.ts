import { useAppSelector } from './reduxHooks'

type Auth = {
  isAuth: boolean
  username: string | null
  email: string | null
  image?: string | null
}

const useAuth = (): Auth => {
  const { email, username, image } = useAppSelector((state) => state.user)

  return { isAuth: !!email, username, email, image }
}

export default useAuth
