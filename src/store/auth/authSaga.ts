import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  FirebaseCredProfile,
  AuthRequest,
  UserProfile,
  AuthResponseProfile,
} from "../types/auth.types";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  type UserCredential,
} from "firebase/auth";
import { call, put, takeEvery } from "redux-saga/effects";
import { auth } from "../../firebase/firebase";
import { authAction } from "./authSlice";
import { getUserProfile } from "../../firebase/services/userService";
import { displayErrorNotification } from "../../helpers/helpers";

export function* loginUserWorker(
  action: PayloadAction<AuthRequest>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Generator<any, void, any> {
  try {
    const { email, password } = action.payload;
    const firebaseCred: UserCredential = yield call(
      signInWithEmailAndPassword,
      auth,
      email,
      password
    );

    const serializableFirebaseCred: FirebaseCredProfile = {
      uid: firebaseCred.user.uid,
      email: firebaseCred.user.email || "",
    };

    const userProfileFromDb: UserProfile | null = yield call(
      getUserProfile,
      firebaseCred.user.uid,
      firebaseCred.user.email || ""
    );

    if (!userProfileFromDb) {
      const errorMsg = "Could not retrieve user profile";
      displayErrorNotification(errorMsg);
      yield put(authAction.loginUserFail(errorMsg));
      return;
    }

    yield put(
      authAction.loginUserSuccess({
        credProfile: serializableFirebaseCred,
        userProfile: userProfileFromDb,
      })
    );
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "Error logging in!";
    displayErrorNotification(errMsg);
    yield put(authAction.loginUserFail(errMsg));
  }
}

export function* registerUserWorker(
  action: PayloadAction<AuthRequest>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Generator<any, void, any> {
  try {
    const { email, password } = action.payload;

    const firebaseCred: UserCredential = yield call(
      createUserWithEmailAndPassword,
      auth,
      email,
      password
    );

    const serializableFirebaseCred: FirebaseCredProfile = {
      uid: firebaseCred.user.uid,
      email: firebaseCred.user.email || "",
    };

    const newUserProfileFromDb: UserProfile | null = yield call(
      getUserProfile,
      firebaseCred.user.uid,
      firebaseCred.user.email || ""
    );

    if (!newUserProfileFromDb) {
      const errorMsg = "User registered but could not create new user profile";
      displayErrorNotification(errorMsg);
      yield put(authAction.loginUserFail(errorMsg));
      return;
    }

    yield put(
      authAction.registerUserSuccess({
        credProfile: serializableFirebaseCred,
        userProfile: newUserProfileFromDb,
      })
    );
  } catch (error) {
    const errMsg =
      error instanceof Error ? error.message : "Error registering user";
    displayErrorNotification(errMsg);
    yield put(authAction.registerUserFail(errMsg));
  }
}

export function* logoutWorker() {
  try {
    yield call(signOut, auth);
  } catch (error) {
    const errMsg =
      error instanceof Error
        ? error.message
        : "Error logging out. Try again later.";
    displayErrorNotification(errMsg);
  }
}

export function* restoreSessionWorker(
  action: PayloadAction<AuthResponseProfile>
) {
  try {
    const firebaseCred = action.payload.credProfile;
    console.log("in saga", firebaseCred);

    if (!firebaseCred) {
      throw new Error("Firebase Credential is null");
    }
    const userProfileFromDb: UserProfile | null = yield call(
      getUserProfile,
      firebaseCred.uid,
      firebaseCred.email || ""
    );

    if (!userProfileFromDb) {
      const errorMsg = "Could not retrieve user profile";
      displayErrorNotification(errorMsg);
      yield put(authAction.loginUserFail(errorMsg));
      return;
    }
    console.log("Success", firebaseCred, userProfileFromDb);

    yield put(
      authAction.restoreSessionSuccess({
        credProfile: firebaseCred,
        userProfile: userProfileFromDb,
      })
    );
  } catch (error) {
    const errMsg =
      error instanceof Error
        ? error.message
        : "Error logging out. Try again later.";
    displayErrorNotification(errMsg);
    yield put(authAction.registerUserFail(errMsg));
  }
}

export function* authWatcher() {
  yield takeEvery(authAction.loginUser, loginUserWorker);
  yield takeEvery(authAction.registerUser, registerUserWorker);
  yield takeEvery(authAction.logoutUser, logoutWorker);
  yield takeEvery(authAction.restoreSession, restoreSessionWorker);
}
