import { all, fork } from 'redux-saga/effects';
import { watchAuthSaga } from './authSaga';
import { watchRoundsSaga } from './roundsSaga';
import { watchServerSaga } from './serverSaga';

export default function* rootSaga() {
  yield all([
    fork(watchAuthSaga),
    fork(watchRoundsSaga),
    fork(watchServerSaga),
  ]);
}
 