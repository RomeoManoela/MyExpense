import { configureStore } from '@reduxjs/toolkit'
import transactionsReducer from './features/transaction/transactionSlice'
import userReducer from './features/user/userSlice'

const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    user: userReducer,
  },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
