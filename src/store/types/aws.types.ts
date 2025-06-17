import type { Edge, Node } from "reactflow";
import AwsServiceNode from "../../components/diagrams/AwsServiceNode";

export interface AwsServiceDefinition {
  id: string;
  name: string;
  icon?: string;
  nodeType: string;
}

export interface AwsServiceNodeData {
  serviceDefinitionId: string;
  label: string;
  icon?: string;
}

// Simplified EdgeData interface - removed connection type fields
export interface EdgeData {
  label?: string;
  bandwidth?: string;
  protocol?: string;
}

export type AwsNode = Node<AwsServiceNodeData>;
export type AwsEdge = Edge<EdgeData>;

export interface FlowData {
  nodes: AwsNode[];
  edges: AwsEdge[];
  viewport?: any;
}

export const initialNodes: AwsNode[] = [
  {
    id: "1",
    type: "awsServiceNode",
    data: { serviceDefinitionId: "ec2", label: "My EC2" },
    position: { x: 250, y: 5 },
  },
];

export const initialEdges: AwsEdge[] = [];

export const nodeTypes = {
  awsServiceNode: AwsServiceNode,
};

export const edgeTypes = {};
