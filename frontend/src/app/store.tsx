import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "../features/token/tokenSlice";
import userReducer from "../features/user/userSlice";
import familyReducer from "../features/family/familySlice";
import settingReducer from "../features/setting/settingSlice";

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    user: userReducer,
    family: familyReducer,
    setting: settingReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
