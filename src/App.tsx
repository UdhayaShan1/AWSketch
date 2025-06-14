import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import Header from "./components/Header";
import AuthRouter from "./components/auth/AuthRouter";
import { Content, Footer } from "antd/es/layout/layout";
import Home from "./components/Home";
import Projects from "./components/projects/Projects";
import "./App.css";
import Profile from "./components/profile/Profile";

function App() {
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: "100vh" }}>
        <Header />
        <AuthRouter>
          <Content style={{ padding: "0 50px", margin: "16px 0" }}>
            <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/profile" element={<Profile />}></Route>
              </Routes>
            </div>
          </Content>
        </AuthRouter>
        <Footer style={{ textAlign: "center" }}>
          AWSketch ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
