import { wakeUpServerSuccess, wakeUpServerFailure, wakeUpServerRequest } from '../slices/serverSlice';
import {API_ENDPOINTS, apiClient} from '../../config/api';
import { call, put, takeLatest, delay } from 'redux-saga/effects';

export function* wakeUpServerSaga() {
  while (true) {
    try {
      yield call(
          apiClient.get,
          API_ENDPOINTS.auth.health
      );
      yield put(wakeUpServerSuccess());
      return;
    } catch (error) {
      yield put(wakeUpServerFailure());
      yield delay(60000); // Wait 1 minute before retrying
    }
  }
}

export function* watchServerSaga() {
  yield takeLatest(wakeUpServerRequest.type, wakeUpServerSaga);
}
