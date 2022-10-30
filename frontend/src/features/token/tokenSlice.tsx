import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

interface TokenState { // 타입 지정
  access: string,
  refresh: string,
}

const initialState: TokenState = { // 초기 상태
  access: localStorage.getItem("access") || "",
  refresh: localStorage.getItem("refresh") || "",
}

export const tokenSlice = createSlice({
  name: 'token', // 이름은 토큰
  initialState, // 초기 상태
  reducers: { // 값 변화 시키는 방법
    setAccessToken: (state:any, action: PayloadAction<string>) => {
      state.access = action.payload;
      localStorage.setItem("access", action.payload);
    },
    setRefreshToken: (state:any, action: PayloadAction<string>) => {
      state.refresh = action.payload;
      localStorage.setItem("refresh", action.payload);
    },
  }
})

// Action creators are generated for each case reducer function
export const { setAccessToken, setRefreshToken } = tokenSlice.actions

export const selectAccessToken = (state: RootState) => state.token.access
export const selectRefreshToken = (state: RootState) => state.token.refresh

export default tokenSlice.reducer