import { useEffect, useState } from "react";
import {
  Card,
  List,
  Tag,
  Button,
  Space,
  Typography,
  Input,
  Modal,
  Tooltip,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  FolderOpenOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../store/rootTypes";
import { projectsListSelector } from "../../store/projects/projectsSelector";
import { projectsAction } from "../../store/projects/projectsSlice";
import type { ProjectUserInput } from "../../store/types/projects.types";
import EditProject from "./EditProject";

const { Title, Text, Paragraph } = Typography;
const { Search } = Input;
const { confirm } = Modal;

export default function ViewProjects() {
  const projectsList = useAppSelector(projectsListSelector);
  const [projectListArray, setProjectListArray] = useState<ProjectUserInput[]>(
    []
  );
  const [selectedProject, setSelectedProject] =
    useState<ProjectUserInput | null>(null);
  const [selectedDelProject, setSelectedDelProject] =
    useState<ProjectUserInput | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(projectsAction.getProjectList());
  }, []);
  useEffect(() => {
    const projectUserInputList: ProjectUserInput[] = [];
    for (const key in projectsList) {
      if (key === "uid" || key === "maxId") {
        continue;
      }
      const ref: ProjectUserInput = projectsList[key] as ProjectUserInput;
      const projectUserInput: ProjectUserInput = { ...ref, id: key };
      projectUserInputList.push(projectUserInput);
    }

    setProjectListArray(projectUserInputList);
  }, [projectsList]);

  useEffect(() => {
    console.log("List", projectListArray);
  }, [projectListArray]);

  const getEnvironmentColor = (env: string) => {
    switch (env) {
      case "development":
        return "green";
      case "staging":
        return "orange";
      case "production":
        return "red";
      default:
        return "default";
    }
  };

  const renderProjects = () => {
    return (
      <>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 3,
            xl: 3,
            xxl: 4,
          }}
          dataSource={projectListArray}
          renderItem={(project) => (
            <List.Item>
              <Card
                cover={
                  <div
                    style={{
                      height: 120,
                      background: "#f5f5f5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: `linear-gradient(45deg, 
                          ${
                            project.environment === "development"
                              ? "#52c41a33"
                              : project.environment === "staging"
                              ? "#faad1433"
                              : "#ff4d4f33"
                          } 
                          30%, transparent 70%)`,
                      }}
                    />
                    <FolderOpenOutlined
                      style={{ fontSize: 48, color: "#1890ff", opacity: 0.7 }}
                    />
                    <Tag
                      color={getEnvironmentColor(project.environment)}
                      style={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        fontSize: "12px",
                        textTransform: "uppercase",
                      }}
                    >
                      {project.environment}
                    </Tag>
                  </div>
                }
                actions={[
                  <Tooltip title="Edit Project">
                    <Button
                      type="text"
                      icon={<EditOutlined />}
                      onClick={() => setSelectedProject(project)}
                    />
                  </Tooltip>,
                  <Tooltip title="Delete Project">
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => {
                        setConfirmDelete(true);
                        setSelectedDelProject(project);
                      }}
                      //loading={deleteLoading}
                    />
                  </Tooltip>,
                ]}
              >
                <Card.Meta
                  title={project.name}
                  description={
                    <div>
                      <Paragraph
                        ellipsis={{ rows: 2 }}
                        style={{ marginBottom: "12px" }}
                      >
                        {project.description}
                      </Paragraph>
                      <div>
                        {project.regionPreference && (
                          <Space
                            style={{ marginRight: "16px", marginBottom: "8px" }}
                          >
                            <EnvironmentOutlined style={{ color: "#8c8c8c" }} />
                            <Text type="secondary" style={{ fontSize: "12px" }}>
                              {project.regionPreference}
                            </Text>
                          </Space>
                        )}
                        <Space style={{ marginBottom: "8px" }}>
                          <ClockCircleOutlined style={{ color: "#8c8c8c" }} />
                          <Text type="secondary" style={{ fontSize: "12px" }}>
                            Created On: {project.createdOn}
                          </Text>
                          <Text type="secondary" style={{ fontSize: "12px" }}>
                            Updated On: {project.updatedOn}
                          </Text>
                        </Space>
                      </div>
                    </div>
                  }
                />
              </Card>
            </List.Item>
          )}
        />

        <Modal
          open={selectedProject !== null}
          onCancel={() => setSelectedProject(null)}
          footer={null}
          destroyOnHidden
        >
          <Title level={3}>Edit Project</Title>
          {selectedProject && (
            <EditProject
              project={selectedProject}
              setSelectedProject={setSelectedProject}
            ></EditProject>
          )}
        </Modal>

        {selectedDelProject && (
          <Modal
            open={confirmDelete}
            onCancel={() => setConfirmDelete(false)}
            footer={null}
          >
            <Title level={3}>Are you sure?</Title>
            <Space>
              <Button
                type="primary"
                danger
                onClick={() => {
                  dispatch(projectsAction.deleteProject(selectedDelProject));
                  setSelectedProject(null);
                  setConfirmDelete(false);
                }}
              >
                Yes
              </Button>
              <Button
                onClick={() => {
                  setSelectedProject(null);
                  setConfirmDelete(false);
                }}
              >
                No
              </Button>
            </Space>
          </Modal>
        )}
      </>
    );
  };
  return (
    <>
      <Title level={2}>View Projects</Title>
      {renderProjects()}
    </>
  );
}
