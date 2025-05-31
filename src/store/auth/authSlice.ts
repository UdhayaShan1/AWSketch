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
  initialAuthCheckLoading: true,
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
    setInitialAuthCheckLoading(state, action: PayloadAction<boolean>) {
      state.initialAuthCheckLoading = action.payload;
    },
    loginUser(state, _actions: PayloadAction<AuthRequest>) {
      state.isLoading = true;
      state.error = "";
      state.isLoggedIn = false;
      state.credProfile = null;
      state.userProfile = null;
    },
    loginUserSuccess(state, actions: PayloadAction<AuthResponseProfile>) {
      state.isLoading = false;
      state.credProfile = actions.payload.credProfile;
      state.userProfile = actions.payload.userProfile;
      state.isLoggedIn = true;
    },
    loginUserFail(state, actions: PayloadAction<string>) {
      state.isLoading = false;
      state.error = actions.payload;
      state.isLoggedIn = false;
      state.credProfile = null;
      state.userProfile = null;
    },
    registerUser(state, _actions: PayloadAction<AuthRequest>) {
      state.isLoading = true;
      state.error = "";
      state.isLoggedIn = false;
      state.credProfile = null;
      state.userProfile = null;
    },
    registerUserSuccess(state, actions: PayloadAction<AuthResponseProfile>) {
      state.isLoading = false;
      state.credProfile = actions.payload.credProfile;
      state.userProfile = actions.payload.userProfile;
      state.isLoggedIn = true;
    },
    registerUserFail(state, actions: PayloadAction<string>) {
      state.isLoading = false;
      state.error = actions.payload;
      state.isLoggedIn = false;
      state.credProfile = null;
      state.userProfile = null;
    },
    logoutUser(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { actions: authAction } = authSlice;

export default authSlice.reducer;
