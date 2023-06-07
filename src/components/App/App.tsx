import { Routes, Route, Navigate } from 'react-router-dom'

import ArticlesPage from '../pages/ArticlesPage'
import Layout from '../Layout/Layout'
import SingleArticlePage from '../pages/SingleArticlePage'
import RegistrationPage from '../pages/RegistrationPage'
import LoginPage from '../pages/LoginPage'
import ProfileEditPage from '../pages/ProfileEditPage'
import RequireAuth from '../../hoc/RequireAuth'
import ArticleCreatePage from '../pages/ArticleCreatePage'
import ArticleEditPage from '../pages/ArticleEditPage'

const App = () => {
  const token = localStorage.getItem('token')
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ArticlesPage />} />
        <Route path="articles" element={<Navigate to="/" replace />} />
        <Route path="articles/1" element={<Navigate to="/" replace />} />
        <Route path="articles/:pages" element={<ArticlesPage />} />
        <Route path="articles/:pages/:id" element={<SingleArticlePage />} />
        <Route
          path="new-article"
          element={
            <RequireAuth>
              <ArticleCreatePage />
            </RequireAuth>
          }
        />
        <Route
          path="articles/:pages/:id/edit"
          element={
            <RequireAuth>
              <ArticleEditPage />
            </RequireAuth>
          }
        />
        <Route
          path="sign-up"
          element={token ? <Navigate to="/" replace /> : <RegistrationPage />}
        />
        <Route path="sign-in" element={token ? <Navigate to="/" replace /> : <LoginPage />} />
        <Route
          path="profile"
          element={
            <RequireAuth>
              <ProfileEditPage />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
