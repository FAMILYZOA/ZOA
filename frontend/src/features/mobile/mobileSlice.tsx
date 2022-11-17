import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import plus from '../../assets/plus.png'

interface MobileState {
    checklistPhoto: string,
    fcmToken: string,
    fcmTokenId: string,
    isFcmRegist: boolean,
}

const initialState: MobileState = {
    checklistPhoto: plus,
    fcmToken: '',
    fcmTokenId: '',
    isFcmRegist: true,
}

export const mobileSlice = createSlice({
    name: 'mobile',
    initialState,
    reducers: {
        setChecklistPhoto: (state:any, action: PayloadAction<string>) => {
            state.checklistPhoto = action.payload;
        },
        setFcmToken: (state:any, action: PayloadAction<string>) => {
            state.fcmToken = action.payload;
        },
        setFcmTokenId: (state:any, action: PayloadAction<string>) => {
            state.fcmTokenId = action.payload;
        },
        isFcmRegister: (state: any, action: PayloadAction<boolean>) => {
            state.isFcmRegist = action.payload;
        }
    }
})

export const {setChecklistPhoto, setFcmToken, setFcmTokenId, isFcmRegister} = mobileSlice.actions

export const selectMobileChecklistPhoto = (state: RootState) => state.mobile.checklistPhoto;
export const selectfcmToken = (state:RootState) => state.mobile.fcmToken;
export const selectfcmTokenId = (state:RootState) => state.mobile.fcmTokenId;

export default mobileSlice.reducer