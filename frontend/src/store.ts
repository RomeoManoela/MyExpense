import { configureStore } from '@reduxjs/toolkit'
import transactionsReducer from './features/transaction/transactionSlice'
import userReducer from './features/user/userSlice'
import analyticsReducer from './features/transaction/analyticsSlice'

const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    user: userReducer,
    analytics: analyticsReducer,
  },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
