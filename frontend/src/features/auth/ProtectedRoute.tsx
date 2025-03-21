import { Navigate, Outlet } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { AxiosResponse } from 'axios'
import Loader from '../../ui/Loader.tsx'
import api from '../../services/apis.ts'

function ProtectedRoute(): React.ReactElement {
  const [authState, setAuthState] = useState<
    'loading' | 'authenticated' | 'unauthenticated'
  >('loading')

  useEffect(() => {
    async function checkToken() {
      const token: string | null = localStorage.getItem('accessToken')

      // Pas de token = non authentifié
      if (!token) {
        setAuthState('unauthenticated')
        return
      }

      try {
        // Vérifier si le token est expiré
        const exp: number = jwtDecode(token) as number
        const currentTime: number = Date.now() / 1000

        if (exp < currentTime) {
          // Token expiré, essayer de le rafraîchir
          try {
            const response: AxiosResponse = await api.post('token-refresh/', {
              withCredentials: true,
            })

            // Mise à jour du token
            const newToken: string = response.data.access
            localStorage.setItem('accessToken', newToken)
            setAuthState('authenticated')
          } catch (refreshError) {
            console.log(refreshError)
            localStorage.removeItem('accessToken')
            setAuthState('unauthenticated')
          }
        } else {
          // Token valide
          setAuthState('authenticated')
        }
      } catch (error) {
        console.log(error)
        // Erreur de décodage = token invalide
        localStorage.removeItem('accessToken')
        setAuthState('unauthenticated')
      }
    }

    checkToken()
  }, [])

  // Afficher un loader pendant la vérification
  if (authState === 'loading') {
    return <Loader />
  }

  // Rediriger si non authentifié
  if (authState === 'unauthenticated') {
    return <Navigate to='/login' replace />
  }

  // Afficher les routes enfants si authentifié
  return <Outlet />
}

export default ProtectedRoute
