import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  AWSUser,
  AuthResponseProfile,
  AuthRequest,
} from "../types/auth.types";

const initialState: AWSUser = {
  credProfile: null,
  userProfile: null,
  isLoading: false,
  isLoggedIn: false,
  error: "",
  loginPage: true,
};

export const authSlice = createSlice({
  name: "slice",
  initialState,
  reducers: {
    setLoggedInState(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
    setLoginPage(state, action: PayloadAction<boolean>) {
      state.loginPage = action.payload;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    loginUser(state, _actions: PayloadAction<AuthRequest>) {
      Object.assign(state, initialState); 
      state.isLoading = true;
    },
    loginUserSuccess(state, actions: PayloadAction<AuthResponseProfile>) {
      state.isLoading = false;
      state.credProfile = actions.payload.credProfile;
      state.userProfile = actions.payload.userProfile;
      state.isLoggedIn = true; 
    },
    loginUserFail(state, actions: PayloadAction<string>) {
      Object.assign(state, initialState); 
      state.isLoading = false;
      state.error = actions.payload;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    registerUser(state, _actions: PayloadAction<AuthRequest>) {
      Object.assign(state, initialState); 
      state.isLoading = true;
    },
    registerUserSuccess(state, actions: PayloadAction<AuthResponseProfile>) {
      state.isLoading = false;
      state.credProfile = actions.payload.credProfile;
      state.userProfile = actions.payload.userProfile;
      state.isLoggedIn = true;
    },
    registerUserFail(state, actions: PayloadAction<string>) {
      Object.assign(state, initialState); 
      state.isLoading = false;
      state.error = actions.payload;
    },
    logoutUser(state) {
      Object.assign(state, initialState); 
    },
  },
});

export const { actions: authAction } = authSlice;

export default authSlice.reducer;
