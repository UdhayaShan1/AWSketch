import { Button, Layout, Menu } from "antd";

const { Header: AntHeader } = Layout;
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/rootTypes";
import { isloggedInUser } from "../store/auth/authSelector";
import { authAction } from "../store/auth/authSlice";

export default function Header() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(isloggedInUser);
  const location = useLocation();
  return (
    <>
      <AntHeader>
        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
          <div
            className="logo"
            style={{
              width: 120,
              height: 31,
              margin: "0 24px 0 0",
              background: "rgba(255, 255, 255, 0.2)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
            }}
          >
            AWSketch
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[location.pathname]}
            items={[
              {
                key: "/",
                label: <Link to="/">Home</Link>,
              },
              {
                key: "/projects",
                label: <Link to="/projects">Projects</Link>,
              },
              {
                key: "/profile",
                label: <Link to="/profile">Profile</Link>,
              },
              {
                key: "/diagrams",
                label: <Link to="/diagrams">Diagrams</Link>,
              },
            ]}
            style={{ flexGrow: 1 }}
          ></Menu>

          {isLoggedIn && (
            <Button
              onClick={() => dispatch(authAction.logoutUser())}
              style={{ marginLeft: "auto" }}
            >
              Logout
            </Button>
          )}
        </div>
      </AntHeader>
    </>
  );
}
