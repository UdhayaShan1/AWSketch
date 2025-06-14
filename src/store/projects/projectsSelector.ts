import type { RootState } from "../rootTypes";
import type { AuthResponseProfile } from "../types/auth.types";

export const projectsErrorSelector = (state: RootState) => {
  return state.projects.error;
};

export const projectsActiveTabSelector = (state: RootState) => {
  return state.projects.activeTab;
};
