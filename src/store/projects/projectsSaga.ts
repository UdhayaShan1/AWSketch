import type { PayloadAction } from "@reduxjs/toolkit";
import type { ProjectList, ProjectUserInput } from "../types/projects.types";
import { act } from "react";
import { auth } from "../../firebase/firebase";
import {
  addProject,
  getProjectList,
} from "../../firebase/services/projectService";
import { call, put, takeEvery } from "redux-saga/effects";
import { projectsAction } from "./projectsSlice";
import {
  displayErrorNotification,
  displaySuccessNotification,
} from "../../helpers/helpers";

export function* addProjectWorker(action: PayloadAction<ProjectUserInput>) {
  console.log("Adding", action.payload)
  const newProject = action.payload;
  try {
    const uid = auth.currentUser?.uid;
    if (!uid) {
      throw new Error("Uid not found");
    }
    const saveResult: boolean = yield call(addProject, uid, newProject);
    if (!saveResult) {
      throw new Error("Error adding project in service");
    }
    const projectList: ProjectList = yield call(getProjectList, uid);
    displaySuccessNotification(`Added project ${newProject.name} succesfully`);
    yield put(projectsAction.addProjectSuccess(projectList));
  } catch (error) {
    const errMsg =
      error instanceof Error
        ? error.message
        : `Error adding project ${newProject.name} in Saga`;
    displayErrorNotification(errMsg);
    yield put(projectsAction.addProjectFail(errMsg));
  }
}

export function* projectsWatcher() {
  yield takeEvery(projectsAction.addProject, addProjectWorker);
}
