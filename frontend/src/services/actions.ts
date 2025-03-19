import { ActionFunctionArgs, redirect } from 'react-router-dom'
import { AxiosResponse } from 'axios'
import api from './apis.ts'

export const loginAction = async ({
  request,
}: ActionFunctionArgs): Promise<{ error: string } | Response> => {
  const formData: FormData = await request.formData()
  const username = formData.get('username') as string
  const password = formData.get('password') as string
  try {
    const res: AxiosResponse = await api.post('token-obtain/', {
      username,
      password,
    })
    console.log(res)
    localStorage.setItem('accessToken', res.data.access)
    return redirect('/dashboard')
  } catch (error) {
    console.log(error)
    return { error: 'Identifiants invalides' }
  }
}

export const registerAction = async ({
  request,
}: ActionFunctionArgs): Promise<{ error: string } | Response> => {
  const formData: FormData = await request.formData()
  const username = formData.get('username') as string
  const password = formData.get('password') as string
  try {
    await api.post('register/', {
      username,
      password,
    })
    return redirect('/login')
  } catch (error) {
    console.log(error)
    return { error: 'Une erreur est survenue' }
  }
}
