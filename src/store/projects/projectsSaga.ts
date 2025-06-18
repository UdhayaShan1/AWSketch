import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  ProjectDiagramSaveRequest,
  ProjectList,
  ProjectUserInput,
} from "../types/projects.types";
import { act } from "react";
import { auth } from "../../firebase/firebase";
import {
  addProject,
  deleteProject,
  getProjectList,
  updateProject,
} from "../../firebase/services/projectService";
import { call, put, takeEvery } from "redux-saga/effects";
import { projectsAction } from "./projectsSlice";
import {
  displayErrorNotification,
  displaySuccessNotification,
} from "../../helpers/helpers";

export function* addProjectWorker(action: PayloadAction<ProjectUserInput>) {
  console.log("Adding", action.payload);
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

export function* updateProjectWorker(action: PayloadAction<ProjectUserInput>) {
  console.log("Updating", action.payload);
  const newProject = action.payload;
  try {
    const uid = auth.currentUser?.uid;
    if (!uid) {
      throw new Error("Uid not found");
    }
    const saveResult: boolean = yield call(updateProject, uid, newProject);
    if (!saveResult) {
      throw new Error("Error adding project in service");
    }
    const projectList: ProjectList = yield call(getProjectList, uid);
    displaySuccessNotification(
      `Updated project ${newProject.name} succesfully`
    );
    yield put(projectsAction.updateProjectSuccess(projectList));
  } catch (error) {
    const errMsg =
      error instanceof Error
        ? error.message
        : `Error updating project ${newProject.name} in Saga`;
    displayErrorNotification(errMsg);
    yield put(projectsAction.updateProjectFail(errMsg));
  }
}

export function* getProjectListWorker() {
  try {
    const uid = auth.currentUser?.uid;
    if (!uid) {
      throw new Error("Uid not found");
    }
    const projectList: ProjectList = yield call(getProjectList, uid);
    if (!projectList) {
      throw new Error("No project list retrieved in service");
    }
    yield put(projectsAction.getProjectListSuccess(projectList));
  } catch (error) {
    const errMsg =
      error instanceof Error ? error.message : `Error getting project list`;
    displayErrorNotification(errMsg);
    yield put(projectsAction.getProjectListFail(errMsg));
  }
}

export function* deleteProjectWorker(action: PayloadAction<ProjectUserInput>) {
  console.log("Deleting", action.payload);
  const projectToDelete = action.payload;
  try {
    const uid = auth.currentUser?.uid;
    if (!uid) {
      throw new Error("Uid not found");
    }
    if (!projectToDelete.id) {
      throw new Error("Project id not set");
    }
    const deleteResult: boolean = yield call(
      deleteProject,
      uid,
      projectToDelete.id
    );
    if (!deleteResult) {
      throw new Error("Error deleting project in service");
    }

    const projectList: ProjectList = yield call(getProjectList, uid);
    displaySuccessNotification(
      `Deleted project ${projectToDelete.name} succesfully`
    );
    yield put(projectsAction.deleteProjectSuccess(projectList));
  } catch (error) {
    const errMsg =
      error instanceof Error
        ? error.message
        : `Error deleting project ${projectToDelete.name} in Saga`;
    displayErrorNotification(errMsg);
    yield put(projectsAction.deleteProjectFail(errMsg));
  }
}

export function* saveProjectDiagramWorker(
  action: PayloadAction<ProjectUserInput>
) {
  console.log("Saving proj diagram", action.payload);
  const updatedProject = action.payload;
  try {
    const uid = auth.currentUser?.uid;
    if (!uid) {
      throw new Error("Uid not found");
    }
    const saveResult: boolean = yield call(updateProject, uid, updatedProject);
    if (!saveResult) {
      throw new Error("Error updating project in service");
    }
    displaySuccessNotification("Saved diagram to project");
    yield put(projectsAction.saveProjectDiagramSuccess(updatedProject));
  } catch (error) {
    const errMsg =
      error instanceof Error
        ? error.message
        : `Error saving project diagram ${updatedProject.name} in Saga`;
    displayErrorNotification(errMsg);
    yield put(projectsAction.saveProjectDiagramFail(errMsg));
  }
}

export function* projectsWatcher() {
  yield takeEvery(projectsAction.addProject, addProjectWorker);
  yield takeEvery(projectsAction.getProjectList, getProjectListWorker);
  yield takeEvery(projectsAction.updateProject, updateProjectWorker);
  yield takeEvery(projectsAction.deleteProject, deleteProjectWorker);
  yield takeEvery(projectsAction.saveProjectDiagram, saveProjectDiagramWorker);
}
