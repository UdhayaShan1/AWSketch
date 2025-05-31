import {
  isLoadingAuth,
  isloggedInUser,
  isLoginPage,
} from "../../store/auth/authSelector";
import { useAppSelector } from "../../store/rootTypes";
import Login from "./Login";
import type { ReactNode } from "react";
import { Spin } from "antd";
import Register from "./Register";

export default function AuthRouter({ children }: { children: ReactNode }) {
  const isLoggedIn: boolean = useAppSelector(isloggedInUser);
  const isLoading: boolean = useAppSelector(isLoadingAuth);
  const loginPage: boolean = useAppSelector(isLoginPage);

  if (isLoading) {
    return <Spin spinning={isLoading}></Spin>;
  }
  return isLoggedIn ? (
    <>{children}</>
  ) : loginPage ? (
    <Login />
  ) : (
    <Register></Register>
  );
}
