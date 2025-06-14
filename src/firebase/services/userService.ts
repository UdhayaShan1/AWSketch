import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import type { UserProfile } from "../../store/types/auth.types";
import { db } from "../firebase";
import { getCurrentDateString } from "../../helpers/date_helper";

export async function getUserProfile(
  uid: string,
  email: string
): Promise<UserProfile | null> {
  try {
    const userDocRef = doc(db, "UserProfile", uid);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      return userDoc.data() as UserProfile;
    }
    const newProfile = await createDefaultProfile(uid, email);
    return newProfile;
  } catch (error) {
    console.log("Error retrieving user profile", error);
    return null;
  }
}

export async function saveUserProfile(userProfileToSave: UserProfile) {
  try {
    const userDocRef = doc(db, "UserProfile", userProfileToSave.uid);
    await setDoc(userDocRef, {
      uid: userProfileToSave.uid,
      email: userProfileToSave.email,
      name: userProfileToSave.name,
      country: userProfileToSave.country,
      userCategory: userProfileToSave.userCategory,
      lastUpdated: getCurrentDateString(),
      projects: userProfileToSave.projects || [],
    });
    return true;
  } catch {
    console.error("Error saving profile");
    return false;
  }
}

async function createDefaultProfile(uid: string, email: string) {
  const defaultProfile: UserProfile = {
    uid: uid,
    email: email,
    name: "John Doe",
    country: "",
    userCategory: "",
    lastUpdated: getCurrentDateString(),
    projects: [],
  };
  try {
    await saveUserProfile(defaultProfile);
    return defaultProfile;
  } catch (error) {
    console.error("Error creating default profile", error);
    return defaultProfile;
  }
}

export async function deleteUserProfile(uid: string) {
  try {
    console.log("Deleting", uid);
    const docRef = doc(db, "UserProfile", uid);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.log("Error deleting", error);
    return false;
  }
}
