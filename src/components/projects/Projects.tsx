import CreateProject from "./CreateProject";
import ViewProjects from "./ViewProjects";
import { Tabs } from "antd";
import { PlusOutlined, FolderOpenOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../store/rootTypes";
import { projectsActiveTabSelector } from "../../store/projects/projectsSelector";
import { projectsAction } from "../../store/projects/projectsSlice";

export default function Projects() {
  const activeTab = useAppSelector(projectsActiveTabSelector);
  const dispatch = useAppDispatch();
  const tabItems = [
    {
      key: "view",
      label: (
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <FolderOpenOutlined />
          <span>View Projects</span>
        </span>
      ),
      children: <ViewProjects />,
    },
    {
      key: "create",
      label: (
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <PlusOutlined />
          <span>Create Project</span>
        </span>
      ),
      children: <CreateProject />,
    },
  ];

  const onHandleTabChange = (key: string) => {
    dispatch(projectsAction.setActiveTab(key));
  };

  return (
    <>
      <Tabs
        onChange={onHandleTabChange}
        items={tabItems}
        activeKey={activeTab}
      ></Tabs>
    </>
  );
}
