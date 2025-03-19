import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoute() {
  // Vérifier si l'utilisateur est authentifié
  const isAuthenticated = localStorage.getItem('accessToken') !== null

  // Si non authentifié, rediriger vers la page de connexion
  if (!isAuthenticated) {
    return <Navigate to='/login' replace />
  }

  return <Outlet />
}

export default ProtectedRoute
