import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import plus from '../../assets/plus.png'

interface MobileState {
    checklistPhoto: string,
}

const initialState: MobileState = {
    checklistPhoto: plus,
}

export const mobileSlice = createSlice({
    name: 'mobile',
    initialState,
    reducers: {
        setChecklistPhoto: (state:any, action: PayloadAction<string>) => {
            state.checklistPhoto = action.payload;
        }
    }
})

export const {setChecklistPhoto} = mobileSlice.actions

export const selectMobileChecklistPhoto = (state: RootState) => state.mobile.checklistPhoto;

export default mobileSlice.reducer