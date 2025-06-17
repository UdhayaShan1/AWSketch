import { Button, Form, Input, Select } from "antd";
import {
  AWS_REGIONS,
  type ProjectUserInput,
} from "../../store/types/projects.types";
import { useEffect } from "react";
import Title from "antd/es/typography/Title";
import { useAppDispatch } from "../../store/rootTypes";
import { projectsAction } from "../../store/projects/projectsSlice";

interface EditProjectProps {
  project: ProjectUserInput;
  setSelectedProject: React.Dispatch<
    React.SetStateAction<ProjectUserInput | null>
  >;
}

export default function EditProject({ project, setSelectedProject }: EditProjectProps) {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (project) {
      form.setFieldsValue(project);
    }
  }, [project]);

  const onFinish = (values: ProjectUserInput) => {
    const valuesWithId: ProjectUserInput = {
      ...values,
      id: project.id,
      createdOn: project.createdOn,
    };
    console.log("editing", valuesWithId);
    dispatch(projectsAction.updateProject(valuesWithId));
    setSelectedProject(null);
  };
  return (
    <>
      <Title level={4}>{project.name}</Title>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        name="editProject"
      >
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
              <Select.Option key={item}>{item}</Select.Option>
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
