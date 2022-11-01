import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

interface FamilyState { // 타입 지정
  id: number,
  name: string,
  createdAt: string,
  users: {
    id: number,
    name: string,
    image: string,
    set_name: string,
  }[],
}

const initialState: FamilyState = { // 초기 상태
  id: -1,
  name: "",
  createdAt: "",
  users: [
  {
    id: -1,
    name: "",
    image: "",
    set_name: "",
  }],
}

export const familySlice = createSlice({
  name: 'family', // 이름은 패밀리
  initialState, // 초기 상태
  reducers: { // 값 변화 시키는 방법
    setFamilyId: (state:any, action: PayloadAction<number>) => {
      state.id = action.payload;
    },
    setFamilyName: (state:any, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setFamilyCreatedAt: (state:any, action: PayloadAction<string>) => {
      state.createdAt = action.payload;
    },
    setFamilyUsers: (state:any, action: PayloadAction<Array<{
      id: number,
      name: string,
      image: string,
      set_name: string,
    }>>) => {
      state.users = action.payload;
    }
  }
})

// Action creators are generated for each case reducer function
export const { setFamilyId, setFamilyName, setFamilyCreatedAt, setFamilyUsers } = familySlice.actions

export const selectFamilyId = (state: RootState) => state.family.id
export const selectFamilyName = (state: RootState) => state.family.name
export const selectFamilyCreatedAt = (state: RootState) => state.family.createdAt
export const selectFamilyUsers = (state: RootState) => state.family.users

export default familySlice.reducer