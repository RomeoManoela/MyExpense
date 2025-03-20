import api from './apis.ts'
import { AxiosResponse } from 'axios'

export const dashboardLoader = async (): Promise<string> => {
  const res: AxiosResponse = await api.get('user/')
  return res.data.username
}
