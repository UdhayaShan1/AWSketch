import { useState, useEffect } from "react";
import {
  Button,
  Card,
  Select,
  Space,
  Typography,
  Empty,
  Tag,
  Tooltip,
  Avatar,
  message,
} from "antd";
import {
  ProjectOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  CloudServerOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";
import { useAppSelector, useAppDispatch } from "../../store/rootTypes";
import { projectsListSelector } from "../../store/projects/projectsSelector";
import { projectsAction } from "../../store/projects/projectsSlice";
import {
  type ProjectUserInput,
  type ProjectList,
} from "../../store/types/projects.types";
import { DiagramEditor } from "./DiagramEditor";

const { Title, Text } = Typography;
const { Option } = Select;

export default function Diagrams() {
  const dispatch = useAppDispatch();
  const projectList: ProjectList | null = useAppSelector(projectsListSelector);
  const [projectArray, setProjectArray] = useState<ProjectUserInput[]>([]);
  const [selectedProject, setSelectedProject] =
    useState<ProjectUserInput | null>(null);
  const [loading, setLoading] = useState(false);

  // Convert project list to array
  useEffect(() => {
    if (projectList) {
      const newArray: ProjectUserInput[] = [];
      Object.keys(projectList).forEach((key) => {
        if (key !== "uid" && key !== "maxId") {
          const project = projectList[key] as ProjectUserInput;
          newArray.push({ ...project, id: key });
        }
      });

      // Sort projects by creation date (newest first)
      newArray.sort(
        (a, b) =>
          new Date(b.createdOn || "").getTime() -
          new Date(a.createdOn || "").getTime()
      );

      setProjectArray(newArray);
    }
  }, [projectList]);

  const handleProjectChange = (projectId: string) => {
    if (projectId && projectList && projectList[projectId]) {
      const project = projectList[projectId] as ProjectUserInput;
      setSelectedProject({ ...project, id: projectId });
      message.success(`Switched to project: ${project.name}`);
    }
  };

  const refreshProjects = async () => {
    setLoading(true);
    try {
      await dispatch(projectsAction.getProjectList());
      message.success("Projects refreshed");
    } catch (error) {
      message.error("Failed to refresh projects");
    } finally {
      setLoading(false);
    }
  };

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

  const getEnvironmentIcon = (env: string) => {
    switch (env) {
      case "development":
        return "🔧";
      case "staging":
        return "🚀";
      case "production":
        return "⚡";
      default:
        return "📋";
    }
  };

  const renderProjectOption = (project: ProjectUserInput) => (
    <Option key={project.id} value={project.id}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "4px 0",
        }}
      >
        <Avatar
          size="small"
          style={{
            backgroundColor:
              getEnvironmentColor(project.environment) === "green"
                ? "#52c41a"
                : getEnvironmentColor(project.environment) === "orange"
                ? "#faad14"
                : getEnvironmentColor(project.environment) === "red"
                ? "#ff4d4f"
                : "#1890ff",
            fontSize: "12px",
          }}
        >
          {getEnvironmentIcon(project.environment)}
        </Avatar>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontWeight: 600,
              fontSize: "14px",
              color: "#262626",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {project.name}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "2px",
            }}
          ></div>
        </div>
      </div>
    </Option>
  );

  const ProjectSelectorSection = () => (
    <Card style={{ marginBottom: "16px" }} bodyStyle={{ padding: "16px 24px" }}>
      <div style={{ marginBottom: "16px" }}>
        <Title
          level={3}
          style={{
            margin: 0,
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <CloudServerOutlined />
          AWS Architecture Diagrams
        </Title>
        <Text type="secondary">
          Select a project to start designing your AWS architecture
        </Text>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <ProjectOutlined style={{ color: "#1890ff" }} />
          <Text strong>Project:</Text>
        </div>

        <Select
          placeholder="Choose a project to work on..."
          value={selectedProject?.id}
          onChange={handleProjectChange}
          style={{
            minWidth: 300,
            maxWidth: 500,
            flex: 1,
          }}
          size="large"
          allowClear
          onClear={() => {
            setSelectedProject(null);
            message.info("Project deselected");
          }}
          showSearch
          filterOption={(input, option) => {
            const project = projectArray.find((p) => p.id === option?.value);
            return project
              ? project.name.toLowerCase().includes(input.toLowerCase()) ||
                  project.description
                    .toLowerCase()
                    .includes(input.toLowerCase()) ||
                  project.environment
                    .toLowerCase()
                    .includes(input.toLowerCase())
              : false;
          }}
          dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
          notFoundContent={
            projectArray.length === 0 ? (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="No projects found"
                style={{ padding: "20px" }}
              >
                <Button type="primary" icon={<PlusOutlined />} size="small">
                  Create New Project
                </Button>
              </Empty>
            ) : (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="No matching projects"
                style={{ padding: "20px" }}
              />
            )
          }
        >
          {projectArray.map(renderProjectOption)}
        </Select>

        <Tooltip title="Refresh projects">
          <Button
            icon={<ReloadOutlined />}
            onClick={refreshProjects}
            loading={loading}
          />
        </Tooltip>

        <Tooltip title="Create new project">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              // Navigate to projects page or open create modal
              window.location.href = "/projects";
            }}
          >
            New Project
          </Button>
        </Tooltip>
      </div>
    </Card>
  );

  const NoProjectSelected = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "400px",
        textAlign: "center",
        backgroundColor: "#fafafa",
        borderRadius: "8px",
        border: "2px dashed #d9d9d9",
        padding: "40px",
      }}
    >
      <ProjectOutlined
        style={{ fontSize: "64px", color: "#d9d9d9", marginBottom: "16px" }}
      />

      <Title level={3} style={{ color: "#8c8c8c", marginBottom: "8px" }}>
        No Project Selected
      </Title>

      <Text type="secondary" style={{ fontSize: "16px", marginBottom: "24px" }}>
        Please select a project from the dropdown above to start creating AWS
        diagrams
      </Text>

      {projectArray.length === 0 ? (
        <div>
          <Text
            type="secondary"
            style={{ display: "block", marginBottom: "16px" }}
          >
            You don't have any projects yet.
          </Text>
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={() => (window.location.href = "/projects")}
          >
            Create Your First Project
          </Button>
        </div>
      ) : (
        <Text type="secondary">
          Choose from {projectArray.length} available project
          {projectArray.length !== 1 ? "s" : ""}
        </Text>
      )}
    </div>
  );

  return (
    <div>
      <ProjectSelectorSection />

      <ReactFlowProvider>
        {selectedProject ? (
          <DiagramEditor selectedProject={selectedProject}></DiagramEditor>
        ) : (
          <NoProjectSelected />
        )}
      </ReactFlowProvider>
    </div>
  );
}
