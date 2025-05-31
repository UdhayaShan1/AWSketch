import {
  isLoadingAuth,
  isloggedInUser,
  isLoginPage,
  isInitialAuthChecking, // Import new selector
} from "../../store/auth/authSelector";
import { useAppDispatch, useAppSelector } from "../../store/rootTypes";
import Login from "./Login";
import { useEffect, type ReactNode } from "react";
import { Spin } from "antd";
import Register from "./Register";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { authAction } from "../../store/auth/authSlice";

export default function AuthRouter({ children }: { children: ReactNode }) {
  const isLoggedIn = useAppSelector(isloggedInUser);
  const isLoading: boolean = useAppSelector(isLoadingAuth);
  const loginPage: boolean = useAppSelector(isLoginPage);
  const initialAuthCheckLoading = useAppSelector(isInitialAuthChecking); 
  const dispatch = useAppDispatch();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      dispatch(authAction.setLoggedInState(firebaseUser !== null));
      dispatch(authAction.setInitialAuthCheckLoading(false)); 
    });
    return () => unsubscribe();
  }, [dispatch]);

  if (isLoading || initialAuthCheckLoading) {
    return <Spin spinning={true} fullscreen />;
  }

  return isLoggedIn ? (
    <>{children}</>
  ) : loginPage ? (
    <Login />
  ) : (
    <Register />
  );
}
