import {
  isLoadingAuth,
  isloggedInUser,
  isLoginPage,
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
  const dispatch = useAppDispatch();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      dispatch(authAction.setLoggedInState(firebaseUser !== null));
    });
    return () => unsubscribe();
  }, [dispatch]);

  if (isLoading) {
    return <Spin spinning={isLoading} fullscreen />;
  }

  return isLoggedIn ? (
    <>{children}</>
  ) : loginPage ? (
    <Login />
  ) : (
    <Register />
  );
}
