import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface SettingState {
  // 타입 지정
  fontSize: number;
  push: boolean;
}

const initialState: SettingState = {
  // 초기 상태
  fontSize: Number(localStorage.getItem("font_size")) || 1,
  push: "" !== localStorage.getItem("is_push") || true,
};

export const settingSlice = createSlice({
  name: "setting", // 이름은 세팅
  initialState, // 초기 상태
  reducers: {
    // 값 변화 시키는 방법
    setFontSize: (state: any, action: PayloadAction<number>) => {
      state.fontSize = action.payload;
      localStorage.setItem("font_size", String(action.payload));
    },
    setPush: (state: any, action: PayloadAction<boolean>) => {
      state.push = action.payload;
      localStorage.setItem("is_push", action.payload ? "true" : "");
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFontSize, setPush } = settingSlice.actions;

export const selectFontSize = (state: RootState) => state.setting.fontSize;
export const selectPush = (state: RootState) => state.setting.push;

export default settingSlice.reducer;
