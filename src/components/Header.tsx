import { Layout, Menu } from "antd";

const { Header: AntHeader } = Layout;
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  return (
    <>
      <AntHeader>
        <div style={{ display: "flex", alignItems: "center" }}>
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
            ]}
          ></Menu>
        </div>
      </AntHeader>
    </>
  );
}
