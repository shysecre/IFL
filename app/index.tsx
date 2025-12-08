import { WelcomePage, AuthPage, ProcessAuthPage, ProtectedRoute, HomePage, SettingsPage } from '@/app/routes'
import '@/app/styles/app.css'
import { Routes, Route } from 'react-router'

export const App = () => {
  return (
    <Routes>
      <Route path="/" Component={WelcomePage} />
      <Route path="/auth" Component={AuthPage} />
      <Route path="/process-auth" Component={ProcessAuthPage} />
      <Route Component={ProtectedRoute}>
        <Route path="/home" Component={HomePage} />
        <Route path="/settings" Component={SettingsPage} />
      </Route>
    </Routes>
  )
}
