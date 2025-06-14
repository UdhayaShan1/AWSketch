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
  },
});

export const { actions: projectsAction } = projectsSlice;

export default projectsSlice.reducer;
