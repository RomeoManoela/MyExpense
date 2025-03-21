import { TransactionState } from '../../utils/type.ts'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import api from '../../services/apis.ts'

const initialState: TransactionState = {
  transactions: [],
  montant_max: null,
  montant_actuel: null,
}

export const fetchTransactions = createAsyncThunk(
  'transaction/fetchTransactions',
  async () => {
    const response: AxiosResponse = await api.get('transactions/')
    return response.data
  },
)

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.transactions.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.transactions = []
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload
      })
      .addCase(fetchTransactions.rejected, (state) => {
        state.transactions = []
      })
  },
})

export const { addTransaction } = transactionSlice.actions
export default transactionSlice.reducer
