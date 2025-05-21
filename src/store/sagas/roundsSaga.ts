import { call, put, takeLatest } from 'redux-saga/effects';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  fetchRoundsRequest,
  fetchRoundsSuccess,
  fetchRoundsFailure,
  tapRequest,
  tapSuccess,
  tapFailure,
  createRoundRequest,
  createRoundSuccess,
  createRoundFailure,
  fetchRoundDetailsRequest,
  fetchRoundDetailsSuccess,
  fetchRoundDetailsFailure,
  fetchRoundRequest,
  fetchRoundSuccess,
  fetchRoundFailure,
} from '../slices/roundsSlice';
import { apiClient, API_ENDPOINTS } from '../../config/api';
import type { AxiosResponse } from 'axios';
import type { Round, RoundsConfig, RoundDetails } from '../slices/roundsSlice';

interface RoundsResponse {
  rounds: Round[];
  config: RoundsConfig;
}

interface TapResponse {
  message: string;
  tapsCount: number;
  points: number;
}

function* fetchRoundsSaga(): Generator<any, void, any> {
  try {
    const response: AxiosResponse<RoundsResponse> = yield call(
      apiClient.get,
      API_ENDPOINTS.rounds.list
    );

    if (!response.data.rounds || !Array.isArray(response.data.rounds)) {
      console.error('Invalid rounds response:', response.data);
      yield put(fetchRoundsFailure('Invalid response format from server'));
      return;
    }

    yield put(fetchRoundsSuccess(response.data));
  } catch (error: any) {
    console.error('Fetch rounds error:', error.response?.data || error.message);
    yield put(fetchRoundsFailure(
      error.response?.data?.message || error.message || 'Failed to fetch rounds'
    ));
  }
}

function* tapSaga(action: PayloadAction<number>): Generator<any, void, any> {
  try {
    const response: AxiosResponse<TapResponse> = yield call(
      apiClient.post,
      API_ENDPOINTS.rounds.tap(action.payload)
    );

    yield put(tapSuccess({
      roundId: action.payload,
      points: response.data.points
    }));
  } catch (error: any) {
    console.error('Tap error:', error.response?.data || error.message);
    yield put(tapFailure(
      error.response?.data?.message || error.message || 'Failed to tap'
    ));
  }
}

function* createRoundSaga(): Generator<any, void, any> {
  try {
    const response: AxiosResponse<Round> = yield call(
      apiClient.post,
      API_ENDPOINTS.rounds.create
    );

    yield put(createRoundSuccess(response.data));
  } catch (error: any) {
    console.error('Create round error:', error.response?.data || error.message);
    yield put(createRoundFailure(
      error.response?.data?.message || error.message || 'Failed to create round'
    ));
  }
}

function* fetchRoundDetailsSaga(action: PayloadAction<number>): Generator<any, void, any> {
  try {
    const response: AxiosResponse<RoundDetails> = yield call(
      apiClient.get,
      API_ENDPOINTS.rounds.details(action.payload)
    );

    yield put(fetchRoundDetailsSuccess(response.data));
  } catch (error: any) {
    console.error('Fetch round details error:', error.response?.data || error.message);
    yield put(fetchRoundDetailsFailure(
      error.response?.data?.message || error.message || 'Failed to fetch round details'
    ));
  }
}

function* fetchRoundSaga(action: PayloadAction<string>): Generator<any, void, any> {
  try {
    const response: AxiosResponse<Round> = yield call(
      apiClient.get,
      API_ENDPOINTS.rounds.get(Number(action.payload))
    );

    yield put(fetchRoundSuccess(response.data));
  } catch (error: any) {
    console.error('Fetch round error:', error.response?.data || error.message);
    yield put(fetchRoundFailure(
      error.response?.data?.message || error.message || 'Failed to fetch round'
    ));
  }
}

export function* watchRoundsSaga(): Generator {
  yield takeLatest(fetchRoundsRequest.type, fetchRoundsSaga);
  yield takeLatest(tapRequest.type, tapSaga);
  yield takeLatest(createRoundRequest.type, createRoundSaga);
  yield takeLatest(fetchRoundDetailsRequest.type, fetchRoundDetailsSaga);
  yield takeLatest(fetchRoundRequest.type, fetchRoundSaga);
} 