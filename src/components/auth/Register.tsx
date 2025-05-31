import type { AuthRequest } from "../../store/types/auth.types";
import { Form, Input, Button, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "../../store/rootTypes";
import { authAction } from "../../store/auth/authSlice";
import { isLoadingAuth } from "../../store/auth/authSelector";

const { Title } = Typography;

export default function Register() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isLoadingAuth);

  const onFinish = (values: AuthRequest) => {
    console.log("Register values:", values);
    dispatch(authAction.registerUser(values));
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
        Register
      </Title>
      <Form
        name="Register"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please input your password!" },
            { min: 6, message: "Password must be at least 6 characters!" },
          ]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm your password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={isLoading}>
            Register
          </Button>
        </Form.Item>

        <Form.Item>
          <Button onClick={() => dispatch(authAction.setLoginPage(true))} block>
            Back to Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
