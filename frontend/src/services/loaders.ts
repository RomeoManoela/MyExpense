import { setUser } from '../features/user/userSlice.ts'
import store from '../store.ts'
import { AxiosResponse } from 'axios'
import api from './apis.ts'
import { fetchTransactions } from '../features/transaction/transactionSlice.ts'
import { fetchAnalytics } from '../features/transaction/analyticsSlice.ts'

export const dashboardLoader = async (): Promise<null> => {
  const res: AxiosResponse = await api.post('budgets/', {
    montant_max: 0,
    montant_actuel: 0,
    total_montant: 0,
  })
  store.dispatch(setUser())
  store.dispatch(fetchTransactions())
  store.dispatch(fetchAnalytics())

  console.log(res.data)

  return null
}
