import type { RootState } from "../rootTypes";
import type { AuthResponseProfile } from "../types/auth.types";

export const isloggedInUser = (state: RootState): boolean => {
  return state.auth.isLoggedIn ?? false;
};

export const retrieveloggedInUser = (state: RootState): AuthResponseProfile => {
  return {
    credProfile: state.auth.credProfile,
    userProfile: state.auth.userProfile,
  };
};

export const isLoadingAuth = (state: RootState): boolean => {
  return state.auth.isLoading ?? false;
};

export const isLoginPage = (state: RootState): boolean => {
  return state.auth.loginPage ?? true;
};

export const isInitialAuthChecking = (state: RootState): boolean => {
  return state.auth.initialAuthCheckLoading ?? true; 
};
