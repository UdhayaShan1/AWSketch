import type { AuthRequest } from "../../store/types/auth.types";
import { Form, Input, Button, Typography } from "antd";
import { useAppDispatch } from "../../store/rootTypes";
import { authAction } from "../../store/auth/authSlice";

const { Title } = Typography;

export default function Login() {
  const dispatch = useAppDispatch();
  
  const onFinish = (values: AuthRequest) => {
    console.log("Login values:", values);
    dispatch(authAction.loginUser(values));
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "50px auto",
        padding: 24,
        boxShadow: "0 0 8px rgba(0,0,0,0.1)",
      }}
    >
      <Title level={3} style={{ textAlign: "center" }}>
        Login
      </Title>
      <Form
        name="Login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Log In
          </Button>
        </Form.Item>

        <Form.Item>
          <Button
            style={{ backgroundColor: "red", color: "white" }}
            onClick={() => dispatch(authAction.setLoginPage(false))}
            block
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
