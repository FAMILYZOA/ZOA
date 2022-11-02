import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

interface SettingState { // 타입 지정
  fontSize: number,
}

const initialState: SettingState = { // 초기 상태
  fontSize: Number(localStorage.getItem("font_size")) || 1,
}

export const settingSlice = createSlice({
  name: 'setting', // 이름은 세팅
  initialState, // 초기 상태
  reducers: { // 값 변화 시키는 방법
    setFontSize: (state:any, action: PayloadAction<number>) => {
      state.fontSize = action.payload;
      localStorage.setItem("font_size", String(action.payload));
    },
  }
})

// Action creators are generated for each case reducer function
export const { setFontSize } = settingSlice.actions

export const selectFontSize = (state: RootState) => state.setting.fontSize

export default settingSlice.reducer