import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

interface TokenState {
  value: string,
}

const initialState: TokenState = {
  value: "",
}

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state:any, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  }
})

// Action creators are generated for each case reducer function
export const { setToken } = tokenSlice.actions

export const selectToken = (state: RootState) => state.token.value 

export default tokenSlice.reducer