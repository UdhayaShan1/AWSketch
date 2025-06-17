import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  AWSUser,
  AuthResponseProfile,
  AuthRequest,
  UserProfile,
} from "../types/auth.types";
import type {
  ProjectList,
  ProjectState,
  ProjectUserInput,
} from "../types/projects.types";
import type { deleteProject } from "../../firebase/services/projectService";

const initialState: ProjectState = {
  isLoading: false,
  error: "",
  projectList: null,
  selectedProject: null,
  activeTab: "view",
};

export const projectsSlice = createSlice({
  name: "slice",
  initialState,
  reducers: {
    setActiveTab: (state, actions: PayloadAction<string>) => {
      state.activeTab = actions.payload;
    },
    getProjectList: (state) => {
      state.isLoading = true;
    },
    getProjectListSuccess: (state, actions: PayloadAction<ProjectList>) => {
      state.isLoading = false;
      state.projectList = actions.payload;
    },
    getProjectListFail: (state, actions: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = actions.payload;
    },
    addProject: (state, actions: PayloadAction<ProjectUserInput>) => {
      console.log("Called", actions.payload);
      state.isLoading = true;
    },
    addProjectSuccess: (state, actions: PayloadAction<ProjectList>) => {
      state.isLoading = false;
      state.projectList = actions.payload;
      state.activeTab = "view";
    },
    addProjectFail: (state, actions: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = actions.payload;
    },
    updateProject: (state, actions: PayloadAction<ProjectUserInput>) => {
      console.log("Called", actions.payload);
      state.isLoading = true;
    },
    updateProjectSuccess: (state, actions: PayloadAction<ProjectList>) => {
      state.isLoading = false;
      state.projectList = actions.payload;
      state.activeTab = "view";
    },
    updateProjectFail: (state, actions: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = actions.payload;
    },
    deleteProject: (state, actions: PayloadAction<ProjectUserInput>) => {
      console.log("Called", actions.payload);
      state.isLoading = true;
    },
    deleteProjectSuccess: (state, actions: PayloadAction<ProjectList>) => {
      state.isLoading = false;
      state.projectList = actions.payload;
      state.activeTab = "view";
    },
    deleteProjectFail: (state, actions: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = actions.payload;
    },
    saveProjectDiagram: (state, actions: PayloadAction<ProjectUserInput>) => {
      state.isLoading = true;
    },
    saveProjectDiagramSuccess: (
      state,
      actions: PayloadAction<ProjectUserInput>
    ) => {
      state.isLoading = false;
      const updatedProject: ProjectUserInput = actions.payload;
      if (state.projectList && updatedProject.id) {
        state.projectList[updatedProject.id] = updatedProject;
      }
    },
    saveProjectDiagramFail: (state, actions: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = actions.payload;
    },
  },
});

export const { actions: projectsAction } = projectsSlice;

export default projectsSlice.reducer;
