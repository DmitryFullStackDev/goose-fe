import { delay, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { wakeUpServerSuccess, wakeUpServerFailure, wakeUpServerRequest } from '../slices/serverSlice';

export function* wakeUpServerSaga() {
  while (true) {
    try {
      yield axios.get(`/health?t=${Date.now()}`, {
        timeout: 60000,
        withCredentials: true,
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      });
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