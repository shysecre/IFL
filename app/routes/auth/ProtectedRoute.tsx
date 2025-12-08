import { useAuth } from '@/app/providers'
import { Navigate, Outlet } from 'react-router'

export const ProtectedRoute = () => {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to={'/'} />
  }

  return <Outlet />
}
