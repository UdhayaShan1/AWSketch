import React, { useCallback, useRef, useState, useEffect } from "react";
import { Button, Card, Select, Space, Typography, Upload, message } from "antd";
import {
  DownloadOutlined,
  UploadOutlined,
  ClearOutlined,
  CloudServerOutlined,
  DeleteOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  useEdgesState,
  useNodesState,
  useReactFlow,
  MarkerType,
  type Connection,
  type Edge,
  type Node,
} from "reactflow";
import { v4 as uuidv4 } from "uuid";
import {
  initialEdges,
  initialNodes,
  nodeTypes,
  edgeTypes,
  type AwsNode,
  type AwsServiceDefinition,
  type FlowData,
  type EdgeData,
} from "../../store/types/aws.types";
import { awsServiceDefinitions, getServiceDefinition } from "./awsServices";
import Palette from "./Palette";
import "reactflow/dist/style.css";
import type {
  Diagram,
  ProjectDiagramSaveRequest,
  ProjectUserInput,
} from "../../store/types/projects.types";
import { useAppDispatch } from "../../store/rootTypes";
import { projectsAction } from "../../store/projects/projectsSlice";

const { Title } = Typography;

interface DiagramEditorProps {
  selectedProject?: ProjectUserInput; // Add proper typing based on your project structure
}

export const DiagramEditor: React.FC<DiagramEditorProps> = ({
  selectedProject,
}) => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { project } = useReactFlow();
  const [isDiagramModified, setIsDiagramModified] = useState(false);
  const [selectedEdges, setSelectedEdges] = useState<string[]>([]);
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedProject?.diagramData) {
      try {
        const diagramData: Diagram = JSON.parse(
          JSON.stringify(selectedProject.diagramData)
        );
        if (diagramData.nodes && diagramData.edges) {
          setNodes(diagramData.nodes);
          setEdges(diagramData.edges);
          setIsDiagramModified(false);
          message.success(`Loaded diagram for ${selectedProject.name}`);
        }
      } catch (error) {
        console.error("Error loading project diagram:", error);
        message.error("Failed to load project diagram");
      }
    } else {
      setNodes([]);
      setEdges([]);
      setIsDiagramModified(false);
    }
  }, [selectedProject, setNodes, setEdges]);

  const saveDiagramToProject = useCallback(() => {
    if (!selectedProject) {
      message.warning("No project selected");
      return;
    }

    try {
      const diagramData: Diagram = {
        nodes,
        edges,
        viewport: {},
        lastModified: new Date().toISOString(),
      };

      if (!selectedProject.id) {
        throw new Error("Selected project has no id");
      }
      const updatedProject: ProjectUserInput = {
        ...selectedProject,
        diagramData: diagramData,
      };

      dispatch(projectsAction.saveProjectDiagram(updatedProject));
      setIsDiagramModified(false);
    } catch (error) {
      console.error("Error saving diagram:", error);
      message.error("Failed to save diagram");
    }
  }, [selectedProject, nodes, edges]);

  useEffect(() => {
    if (isDiagramModified && selectedProject && nodes.length > 0) {
      const autoSaveTimer = setTimeout(() => {
        saveDiagramToProject();
      }, 3000); // Auto-save after 3 seconds of inactivity

      return () => clearTimeout(autoSaveTimer);
    }
  }, [isDiagramModified, selectedProject, nodes.length, saveDiagramToProject]);

  const onConnect = useCallback(
    (params: Connection | Edge) => {
      const newEdge: Edge<EdgeData> = {
        id: uuidv4(),
        source: params.source!,
        target: params.target!,
        sourceHandle: params.sourceHandle,
        targetHandle: params.targetHandle,
        animated: true,
        style: {
          strokeWidth: 2,
          stroke: "#1890ff",
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: "#1890ff",
        },
      };
      setEdges((eds) => addEdge(newEdge, eds));
      setIsDiagramModified(true);
    },
    [setEdges]
  );

  // Handle edge selection
  const onEdgeClick = useCallback((event: React.MouseEvent, edge: Edge) => {
    event.stopPropagation();
    setSelectedEdges([edge.id]);
    setSelectedNodes([]);
  }, []);

  const onSelectionChange = useCallback(
    ({ nodes, edges }: { nodes: Node[]; edges: Edge[] }) => {
      setSelectedNodes(nodes.map((node) => node.id));
      setSelectedEdges(edges.map((edge) => edge.id));
    },
    []
  );

  const deleteSelected = useCallback(() => {
    if (selectedEdges.length > 0) {
      setEdges((eds) => eds.filter((edge) => !selectedEdges.includes(edge.id)));
      message.success(`Deleted ${selectedEdges.length} connection(s)`);
      setIsDiagramModified(true);
    }

    if (selectedNodes.length > 0) {
      setNodes((nds) => nds.filter((node) => !selectedNodes.includes(node.id)));
      setEdges((eds) =>
        eds.filter(
          (edge) =>
            !selectedNodes.includes(edge.source) &&
            !selectedNodes.includes(edge.target)
        )
      );
      message.success(`Deleted ${selectedNodes.length} node(s)`);
      setIsDiagramModified(true);
    }

    setSelectedEdges([]);
    setSelectedNodes([]);
  }, [selectedEdges, selectedNodes, setEdges, setNodes]);

  // Handle keyboard events for deletion
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Delete" || event.key === "Backspace") {
        event.preventDefault();
        deleteSelected();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [deleteSelected]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!reactFlowWrapper.current) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const serviceDataString = event.dataTransfer.getData(
        "application/reactflow"
      );

      if (!serviceDataString) return;

      const serviceDefinition: AwsServiceDefinition =
        JSON.parse(serviceDataString);

      const position = project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode: AwsNode = {
        id: uuidv4(),
        type: serviceDefinition.nodeType,
        position,
        data: {
          serviceDefinitionId: serviceDefinition.id,
          label: serviceDefinition.name,
          icon: serviceDefinition.icon,
        },
      };

      setNodes((nds) => nds.concat(newNode));
      setIsDiagramModified(true);
    },
    [project, setNodes]
  );

  const exportToJson = useCallback(() => {
    const flowData: FlowData = {
      nodes: nodes,
      edges: edges,
    };
    const jsonString = JSON.stringify(flowData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = `aws-diagram-${
      new Date().toISOString().split("T")[0]
    }.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
    message.success("Diagram exported successfully!");
  }, [nodes, edges]);

  const importFromJson = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const flowData: FlowData = JSON.parse(text);

        if (flowData.nodes && flowData.edges) {
          const validatedNodes = flowData.nodes.map((node) => {
            const serviceDef = getServiceDefinition(
              node.data.serviceDefinitionId
            );
            return {
              ...node,
              type: serviceDef?.nodeType || "awsServiceNode",
              data: {
                ...node.data,
                label: node.data.label || serviceDef?.name || "Imported Node",
                icon: node.data.icon || serviceDef?.icon,
              },
            };
          });

          setNodes(validatedNodes);
          setEdges(flowData.edges);
          setSelectedEdges([]);
          setSelectedNodes([]);
          setIsDiagramModified(false);
          message.success("Diagram imported successfully!");
        } else {
          message.error("Invalid JSON file format.");
        }
      } catch (error) {
        console.error("Error importing JSON:", error);
        message.error("Error parsing JSON file.");
      }
    };
    reader.readAsText(file);
    return false;
  };

  const clearCanvas = () => {
    setNodes([]);
    setEdges([]);
    setSelectedEdges([]);
    setSelectedNodes([]);
    setIsDiagramModified(false);
    message.info("Canvas cleared");
  };

  return (
    <div
      style={{
        height: "calc(100vh - 280px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header with project context */}
      <Card
        style={{ marginBottom: "16px" }}
        bodyStyle={{ padding: "16px 24px" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <Title level={4} style={{ margin: 0, color: "#1890ff" }}>
              {selectedProject
                ? `${selectedProject.name} - Architecture Diagram`
                : "Architecture Diagram"}
            </Title>
            <p style={{ margin: "4px 0 0 0", color: "#666" }}>
              {selectedProject
                ? selectedProject.description
                : "Drag AWS services from the palette to create your architecture"}
            </p>
          </div>

          <Space size="middle">
            {
              <>
                <Button
                  type="primary"
                  icon={<SaveOutlined />}
                  onClick={saveDiagramToProject}
                  disabled={!isDiagramModified}
                >
                  {isDiagramModified ? "Save Changes" : "Saved"}
                </Button>
              </>
            }

            <Button
              icon={<DeleteOutlined />}
              onClick={deleteSelected}
              disabled={
                selectedEdges.length === 0 && selectedNodes.length === 0
              }
              danger
            >
              Delete Selected ({selectedEdges.length + selectedNodes.length})
            </Button>

            <Button
              icon={<ClearOutlined />}
              onClick={clearCanvas}
              disabled={nodes.length === 0}
            >
              Clear
            </Button>

            <Upload
              accept=".json"
              beforeUpload={importFromJson}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>Import</Button>
            </Upload>

            <Button
              type="primary"
              icon={<DownloadOutlined />}
              onClick={exportToJson}
              disabled={nodes.length === 0}
            >
              Export
            </Button>
          </Space>
        </div>
      </Card>

      {/* Main Content */}
      <div style={{ display: "flex", flex: 1, gap: "16px" }}>
        {/* Sidebar */}
        <Card
          title="AWS Services"
          style={{ width: "280px", height: "100%" }}
          bodyStyle={{
            padding: "16px",
            height: "calc(100% - 57px)",
            overflowY: "auto",
          }}
        >
          <Palette services={awsServiceDefinitions} />
        </Card>

        {/* Canvas */}
        <Card
          style={{ flex: 1, height: "100%" }}
          bodyStyle={{ padding: 0, height: "calc(100% - 57px)" }}
        >
          <div
            className="reactflow-wrapper"
            ref={reactFlowWrapper}
            style={{ width: "100%", height: "100%" }}
          >
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={(changes) => {
                onNodesChange(changes);
                setIsDiagramModified(true);
              }}
              onEdgesChange={(changes) => {
                onEdgesChange(changes);
                setIsDiagramModified(true);
              }}
              onConnect={onConnect}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onSelectionChange={onSelectionChange}
              onEdgeClick={onEdgeClick}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              fitView
              attributionPosition="bottom-left"
              style={{ background: "#fafafa" }}
              selectNodesOnDrag={false}
              multiSelectionKeyCode="ctrl"
              deleteKeyCode={["Delete", "Backspace"]}
            >
              <Controls />
              <Background color="#ddd" gap={20} />
            </ReactFlow>
          </div>
        </Card>
      </div>

      {/* Instructions for selected items */}
      {(selectedEdges.length > 0 || selectedNodes.length > 0) && (
        <Card
          size="small"
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: "300px",
            backgroundColor: "#f6ffed",
            borderColor: "#b7eb8f",
          }}
        >
          <p style={{ margin: 0, fontSize: "12px", color: "#52c41a" }}>
            💡 <strong>Selected:</strong> {selectedNodes.length} node(s),{" "}
            {selectedEdges.length} connection(s)
            <br />
            Press <kbd>Delete</kbd> or click "Delete Selected" to remove
          </p>
        </Card>
      )}
    </div>
  );
};
