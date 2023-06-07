import { Navigate, useLocation } from 'react-router-dom'

type RequireAuthProps = {
  children: JSX.Element
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const location = useLocation()

  if (!localStorage.getItem('token')) {
    return <Navigate to="/sign-in" state={{ from: location.pathname }} replace />
  }

  return children
}

export default RequireAuth
