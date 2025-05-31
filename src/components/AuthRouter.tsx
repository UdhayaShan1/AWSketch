import useApp from "antd/es/app/useApp";
import { isLoadingAuth, isloggedInUser } from "../store/auth/authSelector";
import { useAppSelector } from "../store/rootTypes";
import Login from "./Login";
import type { ReactNode } from "react";
import { Spin } from "antd";

export default function AuthRouter({ children }: { children: ReactNode }) {
  const isLoggedIn: boolean = useAppSelector(isloggedInUser);
  const isLoading: boolean = useAppSelector(isLoadingAuth);

  if (isLoading) {
    return <Spin spinning={isLoading}></Spin>;
  }
  return isLoggedIn ? <>{children}</> : <Login />;
}
