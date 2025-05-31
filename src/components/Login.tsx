import { useState } from "react";
import type { AuthRequest } from "../store/types/auth.types";
import { Form, Input, Button, Checkbox, Typography } from "antd";

const { Title } = Typography;

export default function Login() {
  const [form, setForm] = useState<AuthRequest>({
    email: "",
    password: "",
  });

  const onFinish = (values: any) => {
    console.log("Login values:", values);
    // handle login logic here (e.g., call API)
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
      </Form>
    </div>
  );
}
