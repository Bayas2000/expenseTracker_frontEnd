import { createSlice } from "@reduxjs/toolkit";

const AuthUserSlice = createSlice({
  name: "Login",
  initialState: {
    UserLoggedIn: false,
    UserData: null,
  },
  reducers: {
    isLoggedIn: (state, action) => {
      state.UserLoggedIn = action.payload;
    },
    getUserData: (state, action) => {
      state.UserData = action.payload;
    },
  },
});

export const { isLoggedIn, getUserData } = AuthUserSlice.actions;

export default AuthUserSlice.reducer;
