import React from 'react'
import AppLayout from './ui/AppLayout.tsx'
import Home from './ui/Home.tsx'
import Login from './features/auth/Login.tsx'
import Register from './features/auth/Register.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Error from './ui/Error.tsx'
import Dashboard from './features/user/Dashboard.tsx'
import { loginAction, registerAction } from './services/actions.ts'
import ProtectedRoute from './features/auth/ProtectedRoute.tsx'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        element: <ProtectedRoute />,
        errorElement: <Error />,
        children: [
          {
            path: '/dashboard',
            element: <Dashboard />,
            errorElement: <Error />,
          },
        ],
      },
      {
        path: '/login',
        element: <Login />,
        action: loginAction,
        errorElement: <Error />,
      },
      {
        path: '/register',
        element: <Register />,
        action: registerAction,
        errorElement: <Error />,
      },
    ],
  },
])

function App(): React.ReactElement {
  return <RouterProvider router={router} />
}

export default App
