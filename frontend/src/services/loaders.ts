import { setUser } from '../features/user/userSlice.ts'
import store from '../store.ts'
import { AxiosResponse } from 'axios'
import api from './apis.ts'

export const dashboardLoader = async (): Promise<null> => {
  store.dispatch(setUser())
  const res: AxiosResponse = await api.post('budgets/', {
    montant_max: 0,
    montant_actuel: 0,
    total_montant: 0,
  })
  console.log(res.data)

  return null
}
