import { Button, Form, Input, Select } from "antd";
import Title from "antd/es/typography/Title";
import {
  AWS_REGIONS,
  type ProjectUserInput,
} from "../../store/types/projects.types";
import { getCurrentDateString } from "../../helpers/date_helper";
import { useAppDispatch, useAppSelector } from "../../store/rootTypes";
import { projectsAction } from "../../store/projects/projectsSlice";
import { useEffect } from "react";
import { projectsErrorSelector } from "../../store/projects/projectsSelector";

export default function CreateProject() {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const errorMsg = useAppSelector(projectsErrorSelector);

  useEffect(() => console.log("Mounted"), []);

  const onFinish = (values: ProjectUserInput) => {
    values.createdOn = getCurrentDateString();
    console.log("Values", values);
    dispatch(projectsAction.addProject(values));
    if (!errorMsg) {
      form.resetFields();
    }
  };
  return (
    <>
      <Title level={2}>Create Projects Here</Title>
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          label="Project Name"
          name="name"
          rules={[{ required: true, message: "Please input a project name" }]}
        >
          <Input placeholder="Enter project name" />
        </Form.Item>

        <Form.Item
          label="Project Description"
          name="description"
          rules={[
            { required: true, message: "Please input project description." },
          ]}
        >
          <Input placeholder="Enter project description" />
        </Form.Item>

        <Form.Item
          label="Environment"
          name="environment"
          rules={[
            { required: true, message: "Please select project environment" },
          ]}
        >
          <Select>
            <Select.Option value="development">Development</Select.Option>
            <Select.Option value="staging">Staging</Select.Option>
            <Select.Option value="production">Production</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Region Preference"
          name="regionPreference"
          rules={[
            { required: false, message: "Please input region preference." },
          ]}
        >
          <Select>
            {AWS_REGIONS.map((item) => (
              <Select key={item}>{item}</Select>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
