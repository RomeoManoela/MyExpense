import { UserState } from '../../utils/type.ts'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../services/apis.ts'
import { AxiosResponse } from 'axios'

const initialState: UserState = {
  username: '',
  budget: {
    solde: null,
    depense: null,
    budget: null,
  },
}

export const setUser = createAsyncThunk('user/setUser', async () => {
  const response: AxiosResponse = await api.get('user/')
  console.log(response.data)
  return response.data
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setUser.fulfilled, (state, action) => {
        state.username = action.payload.username
        state.budget = action.payload.budget
      })
      .addCase(setUser.rejected, () => {
        console.log(
          "Une erreur se produit lors de l'obtention des données de l'utilisateur",
        )
      })
      .addCase(setUser.pending, () => {
        console.log('pending')
      })
  },
})

export default userSlice.reducer
