import type { PayloadAction } from "@reduxjs/toolkit";
import type { FirebaseCredProfile, AuthRequest } from "../types/auth.types";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
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
    console.log("In Saga", email, password);
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

    const userProfileFromDb = yield call(
      getUserProfile,
      firebaseCred.user.uid || "",
      firebaseCred.user.email || ""
    );

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

    const newUserProfileFromDb = yield call(
      getUserProfile,
      firebaseCred.user.uid || "",
      firebaseCred.user.email || ""
    );

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

export function* authWatcher() {
  yield takeEvery(authAction.loginUser, loginUserWorker);
  yield takeEvery(authAction.registerUser, registerUserWorker);
}
