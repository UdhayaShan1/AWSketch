import { useEffect, useState } from "react";
import type { UserProfile } from "../../store/types/auth.types";
import { useAppDispatch, useAppSelector } from "../../store/rootTypes";
import {
  retrieveloggedInUser,
} from "../../store/auth/authSelector";
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Typography,
} from "antd";
import { authAction } from "../../store/auth/authSlice";
import { displayErrorNotification } from "../../helpers/helpers";
import { ExclamationCircleOutlined } from "@ant-design/icons";
const { Title } = Typography;

export default function Profile() {
  const [form] = Form.useForm();
  const loggedInUser = useAppSelector(retrieveloggedInUser);
  const loggedInUserProfile = loggedInUser.userProfile;
  const dispatch = useAppDispatch();
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (loggedInUserProfile) {
      form.setFieldsValue(loggedInUserProfile);
    }
  }, [loggedInUserProfile, form]);

  const onFinish = (values: UserProfile) => {
    console.log(values);
    if (loggedInUserProfile) {
      values["uid"] = loggedInUserProfile?.uid;
      values["projects"] = loggedInUserProfile.projects;
      dispatch(authAction.saveUserProfile(values));
    } else {
      displayErrorNotification(
        "Not properly authenticated, refresh and try again sorry!"
      );
    }
  };

  return (
    <>
      <Title level={3}>Profile Page</Title>
      <Form form={form} name="profile" onFinish={onFinish} layout="vertical">
        <Form.Item label="Email" name="email">
          <Input disabled placeholder="Email address" />
        </Form.Item>

        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: false, message: "Please input your name!" }]}
        >
          <Input placeholder="Enter your name" />
        </Form.Item>

        <Form.Item
          label="Country"
          name="country"
          rules={[{ required: false, message: "Where do you reside?" }]}
        >
          <Input placeholder="Enter your country" />
        </Form.Item>

        <Form.Item
          label="Category"
          name="userCategory"
          rules={[{ required: false, message: "Describe yourself!" }]}
        >
          <Select placeholder="Select your category">
            <Select.Option value="student">Student</Select.Option>
            <Select.Option value="professional"> Professional</Select.Option>
            <Select.Option value="organization">Organization</Select.Option>
            <Select.Option value="freelancer">Freelancer</Select.Option>
            <Select.Option value="entrepreneur"> Entrepreneur</Select.Option>
            <Select.Option value="other">Other</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Save Changes
            </Button>

            <Button
              color="red"
              onClick={() => setConfirmDelete(true)}
              style={{
                backgroundColor: "#ff4d4f",
                borderColor: "#ff4d4f",
                color: "white",
                fontWeight: 600,
                boxShadow: "0 2px 4px rgba(255, 77, 79, 0.3)",
              }}
            >
              Delete Your Data
            </Button>
          </Space>
        </Form.Item>
      </Form>

      <Modal
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <ExclamationCircleOutlined
              style={{ color: "#ff4d4f", fontSize: "20px" }}
            />
            <span>Confirm Profile Deletion</span>
          </div>
        }
        open={confirmDelete}
        onCancel={() => setConfirmDelete(false)}
        onOk={() =>
          dispatch(authAction.deleteUserProfile(loggedInUserProfile?.uid ?? ""))
        }
        width={500}
        height={200}
        destroyOnHidden
      >
        <p style={{ color: "#8c8c8c", fontSize: "16px", marginBottom: "16px" }}>
          This action cannot be undone. All your data will be permanently
          removed.
        </p>
      </Modal>
    </>
  );
}
