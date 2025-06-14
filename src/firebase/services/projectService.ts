import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import {
  EXAMPLE_PROJECT,
  type ProjectList,
  type ProjectUserInput,
} from "../../store/types/projects.types";
import { getCurrentDateString } from "../../helpers/date_helper";

export async function getProjectList(uid: string) {
  try {
    const projectDocRef = doc(db, "Projects", uid);
    const projectDoc = await getDoc(projectDocRef);
    if (projectDoc.exists()) {
      return projectDoc.data() as ProjectList;
    }
    return await createDefaultProjectList(uid);
  } catch (error) {
    console.log("Error retrieving project list", error);
    return null;
  }
}

export async function saveProjectList(projectList: ProjectList) {
  try {
    if (!projectList.uid) {
      throw new Error("No uid in project list!");
    }
    const projectDocRef = doc(db, "Projects", projectList.uid);
    console.log("Saving", projectList);
    await setDoc(projectDocRef, projectList);
    return true;
  } catch (error) {
    console.error("Error creating default profile", error);
    return false;
  }
}

async function createDefaultProjectList(uid: string) {
  const defaultProfile: ProjectList = {
    uid: uid,
    "0": EXAMPLE_PROJECT,
    maxId: "1",
  };
  try {
    await saveProjectList(defaultProfile);
    return defaultProfile;
  } catch (error) {
    console.error("Error creating default profile", error);
    return defaultProfile;
  }
}

async function getProject(uid: string, projectId: string) {
  try {
    const projectList = await getProjectList(uid);
    if (projectList && projectList[projectId]) {
      return projectList[projectId];
    }
    return null;
  } catch (error) {
    console.error("Error getting project", error);
    return null;
  }
}

export async function addProject(uid: string, newProject: ProjectUserInput) {
  try {
    const projectList: ProjectList | null = await getProjectList(uid);
    if (!projectList) {
      throw new Error("No project list retrieved when saving");
    }
    const newProjectWithId: ProjectUserInput = {
      ...newProject,
      id: projectList.maxId,
    };
    if (!newProjectWithId.id) {
      throw new Error("Error creating new project with id");
    }
    console.log("To save", newProject);
    const updatedProjectList: ProjectList = {
      ...projectList,
      maxId: String(Number(projectList.maxId) + 1),
      [newProjectWithId.id]: newProjectWithId,
    };
    const saveResult = await saveProjectList(updatedProjectList);
    if (!saveResult) {
      throw new Error("Error saving project list when saving new project");
    }
    return true;
  } catch (error) {
    console.error("Error saving project", error);
    return false;
  }
}

export async function updateProject(
  uid: string,
  updatedProject: ProjectUserInput
) {
  try {
    const projectList: ProjectList | null = await getProjectList(uid);
    if (!projectList) {
      throw new Error("Unable to retrieve project list when updating project");
    }
    if (!updatedProject.id) {
      throw new Error("New Project does not have an id!");
    }
    const updatedProjectList: ProjectList = {
      ...projectList,
      [updatedProject.id]: {
        ...updatedProject,
        updatedOn: getCurrentDateString(),
      },
    };
    const saveResult = await saveProjectList(updatedProjectList);
    if (!saveResult) {
      throw new Error("Error saving project list when saving new project");
    }

    return true;
  } catch (error) {
    console.error("Error updating project", error);
    return false;
  }
}

export async function deleteProjectList(uid: string) {
  try {
    if (!uid) {
      throw new Error("User ID is required to delete project list");
    }

    console.log("Deleting entire project list for user:", uid);

    const projectDocRef = doc(db, "Projects", uid);
    await deleteDoc(projectDocRef);

    return true;
  } catch (error) {
    console.error("Error deleting project list:", error);
    return false;
  }
}

export async function deleteProject(uid: string, projectId: string) {
  try {
    if (!uid || !projectId) {
      throw new Error("User ID and Project ID are required for deletion");
    }

    const projectList: ProjectList | null = await getProjectList(uid);
    if (!projectList) {
      throw new Error("No project list found for user");
    }

    if (!projectList[projectId]) {
      throw new Error("Project not found");
    }

    console.log("Deleting project:", projectId);

    const updatedProjectList: ProjectList = {
      uid: uid,
      maxId: projectList.maxId,
    };

    Object.keys(projectList).forEach((key) => {
      if (key !== projectId) {
        updatedProjectList[key] = projectList[key];
      }
    });

    const saveResult = await saveProjectList(updatedProjectList);

    if (!saveResult) {
      throw new Error("Failed to save project list after deletion");
    }

    return true;
  } catch (error) {
    console.error("Error deleting project:", error);
    return false;
  }
}
