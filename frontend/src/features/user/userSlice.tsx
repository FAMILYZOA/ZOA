import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface UserState {
  // 타입 지정
  id: number;
  phone: string;
  kakaoId: number;
  familyId: number;
  birth: string;
  image: string;
  name: string;
}

const initialState: UserState = {
  // 초기 상태
  id: -1,
  phone: "",
  kakaoId: -1,
  familyId: -1,
  birth: "",
  image: "",
  name: "",
};

export const userSlice = createSlice({
  name: "user", // 이름은 유저
  initialState, // 초기 상태
  reducers: {
    // 값 변화 시키는 방법
    setUserId: (state: any, action: PayloadAction<number>) => {
      state.id = action.payload;
    },
    setUserPhone: (state: any, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
    setUserKakaoId: (state: any, action: PayloadAction<number>) => {
      state.kakaoId = action.payload;
    },
    setUserFamilyId: (state: any, action: PayloadAction<number>) => {
      state.familyId = action.payload;
    },
    setUserBirth: (state: any, action: PayloadAction<string>) => {
      state.birth = action.payload;
    },
    setUserImage: (state: any, action: PayloadAction<string>) => {
      state.image = action.payload;
    },
    setUserName: (state: any, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setUserId,
  setUserPhone,
  setUserKakaoId,
  setUserFamilyId,
  setUserBirth,
  setUserImage,
  setUserName,
} = userSlice.actions;

export const selectUserId = (state: RootState) => state.user.id;
export const selectUserPhone = (state: RootState) => state.user.phone;
export const selectUserKakaoId = (state: RootState) => state.user.kakaoId;
export const selectUserFamilyId = (state: RootState) => state.user.familyId;
export const selectUserBirth = (state: RootState) => state.user.birth;
export const selectUserImage = (state: RootState) => state.user.image;
export const selectUserName = (state: RootState) => state.user.name;

export default userSlice.reducer;
