import api from './apis.ts'
import { AxiosResponse } from 'axios'
import store from '../store.ts'
import { fetchTransactions } from '../features/transaction/transactionSlice.ts'

export const dashboardLoader = async (): Promise<string> => {
  const response: AxiosResponse = await api.get('user/')
  store.dispatch(fetchTransactions())
  return response.data.username
}
