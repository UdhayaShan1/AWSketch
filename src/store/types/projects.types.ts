import { getCurrentDateString } from "../../helpers/date_helper";
import type { AwsEdge, AwsNode } from "./aws.types";

export interface ProjectState {
  isLoading: boolean;
  error: string;
  projectList: ProjectList | null;
  selectedProject: ProjectUserInput | null;
  activeTab: string;
}

export interface ProjectUserInput {
  id?: string;
  name: string;
  description: string;
  environment: string;
  regionPreference?: string;
  diagramData?: Diagram;
  createdOn?: string;
  updatedOn?: string;
}

export interface Diagram {
  nodes: AwsNode[];
  edges: AwsEdge[];
  viewport: {};
  lastModified: string;
}

export interface ProjectDiagramSaveRequest {
  projectId: string;
  diagram: Diagram;
}

export interface ProjectList {
  uid: string;
  maxId: string;
  [id: string]: ProjectUserInput | string;
}
export const EXAMPLE_PROJECT: ProjectUserInput = {
  id: "0",
  name: "My First AWS Project",
  description:
    "A sample project to help you get started with AWS architecture design. This tutorial project demonstrates basic AWS services and their connections.",
  environment: "development",
  regionPreference: "us-east-1",
  createdOn: getCurrentDateString(),
};

export const AWS_REGIONS = [
  "us-east-1",
  "us-east-2",
  "us-west-1",
  "us-west-2",
  "af-south-1",
  "ap-east-1",
  "ap-south-1",
  "ap-south-2",
  "ap-southeast-1",
  "ap-southeast-2",
  "ap-southeast-3",
  "ap-southeast-4",
  "ap-northeast-1",
  "ap-northeast-2",
  "ap-northeast-3",
  "ca-central-1",
  "ca-west-1",
  "eu-central-1",
  "eu-central-2",
  "eu-west-1",
  "eu-west-2",
  "eu-west-3",
  "eu-south-1",
  "eu-south-2",
  "eu-north-1",
  "il-central-1",
  "me-south-1",
  "me-central-1",
  "sa-east-1",
];

export type AwsRegion = (typeof AWS_REGIONS)[number];
