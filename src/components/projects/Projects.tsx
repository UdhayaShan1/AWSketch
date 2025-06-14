import { useState } from "react";
import CreateProject from "./CreateProject";
import ViewProjects from "./ViewProjects";
import { Tabs } from "antd";
import { PlusOutlined, FolderOpenOutlined } from "@ant-design/icons";

export default function Projects() {
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
  return (
    <>
      <Tabs items={tabItems}></Tabs>
    </>
  );
}
