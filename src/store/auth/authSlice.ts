import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  AWSUser,
  AuthResponseProfile,
  AuthRequest,
  UserProfile,
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
    restoreSession(state, actions: PayloadAction<AuthResponseProfile>) {
      state.isLoading = true;
      state.error = "";
      state.isLoggedIn = false;
      state.credProfile = actions.payload.credProfile;
      state.userProfile = null;
    },
    restoreSessionSuccess(state, actions: PayloadAction<AuthResponseProfile>) {
      state.isLoading = false;
      state.credProfile = actions.payload.credProfile;
      state.userProfile = actions.payload.userProfile;
      state.initialAuthCheckLoading = false;
      state.isLoggedIn = true;
    },
    restoreSessionFailure(state, actions: PayloadAction<string>) {
      state.isLoading = false;
      state.error = actions.payload;
      state.isLoggedIn = false;
      state.credProfile = null;
      state.userProfile = null;
      state.initialAuthCheckLoading = false;
    },
    setInitialAuthCheckLoading(state, action: PayloadAction<boolean>) {
      state.initialAuthCheckLoading = action.payload;
    },
    saveUserProfile(state, _action: PayloadAction<UserProfile>) {
      state.isLoading = true;
    },
    saveUserProfileSuccess(state, action: PayloadAction<UserProfile>) {
      state.isLoading = false;
      state.userProfile = action.payload;
    },
    saveUserProfileFail(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteUserProfile(state, _action: PayloadAction<string>) {
      state.isLoading = true;
    },
    deleteUserProfileSuccess(state) {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.credProfile = null;
      state.userProfile = null;
    },
    deleteUserProfileFail(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { actions: authAction } = authSlice;

export default authSlice.reducer;
