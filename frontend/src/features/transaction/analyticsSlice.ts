import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import api from '../../services/apis.ts'
import { AnalyticsState } from '../../utils/type.ts'

const initialState: AnalyticsState = {
  categories: [],
  dailyExpenses: [],
  loading: false,
  error: null,
  lastUpdated: 0,
}

export const fetchAnalytics = createAsyncThunk(
  'analytics/fetchAnalytics',
  async () => {
    const response: AxiosResponse = await api.get('analytics/')
    return response.data
  },
)

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalytics.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.loading = false
        state.categories = action.payload.categories
        state.dailyExpenses = action.payload.daily_expenses
        state.lastUpdated = Date.now()
      })
      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Une erreur est survenue'
      })
  },
})

export default analyticsSlice.reducer
