import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const plus =
  "https://user-images.githubusercontent.com/97648026/203668375-52410468-5a83-42cc-a062-a8f52ebdc83b.png";

interface MobileState {
  checklistPhoto: string;
  fcmToken: string;
  fcmTokenId: string;
  isFcmRegist: boolean;
  isUpload: boolean;
}

const initialState: MobileState = {
  checklistPhoto: plus,
  fcmToken: "",
  fcmTokenId: localStorage.getItem("fcmID") || "",
  isFcmRegist: true,
  isUpload: false,
};

export const mobileSlice = createSlice({
  name: "mobile",
  initialState,
  reducers: {
    setChecklistPhoto: (state: any, action: PayloadAction<string>) => {
      state.checklistPhoto = action.payload;
    },
    setFcmToken: (state: any, action: PayloadAction<string>) => {
      state.fcmToken = action.payload;
    },
    setFcmTokenId: (state: any, action: PayloadAction<string>) => {
      state.fcmTokenId = action.payload;
      localStorage.setItem("fcmID", action.payload);
    },
    isFcmRegister: (state: any, action: PayloadAction<boolean>) => {
      state.isFcmRegist = action.payload;
    },
    toggleUpload: (state: any, action: PayloadAction<boolean>) => {
      state.isUpload = action.payload;
    },
  },
});

export const {
  setChecklistPhoto,
  setFcmToken,
  setFcmTokenId,
  isFcmRegister,
  toggleUpload,
} = mobileSlice.actions;

export const selectMobileChecklistPhoto = (state: RootState) =>
  state.mobile.checklistPhoto;
export const selectfcmToken = (state: RootState) => state.mobile.fcmToken;
export const selectfcmTokenId = (state: RootState) => state.mobile.fcmTokenId;
export const selectIsUpload = (state: RootState) => state.mobile.isUpload;

export default mobileSlice.reducer;
