import { all } from "redux-saga/effects";
import * as authSaga from "./auth/authSaga";
import * as projectsSaga from "./projects/projectsSaga";
export function* rootSaga() {
  yield all([authSaga.authWatcher(), projectsSaga.projectsWatcher()]);
}
