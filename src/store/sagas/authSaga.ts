import { call, put, takeLatest } from 'redux-saga/effects';
import type { PayloadAction } from '@reduxjs/toolkit';
import {loginRequest, loginSuccess, loginFailure, logout, logoutActionSaga, restoreSessionRequest} from '../slices/authSlice';
import { apiClient, API_ENDPOINTS } from '../../config/api';
import type { AxiosResponse } from 'axios';

interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
    role: 'admin' | 'survivor' | 'nikita';
  };
}

function* loginSaga(action: PayloadAction<{ username: string; password: string }>): Generator<any, void, any> {
  try {
    const response: AxiosResponse<LoginResponse> = yield call(
      apiClient.post,
      API_ENDPOINTS.auth.login,
      action.payload
    );
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    yield put(loginSuccess({ message: 'Login successful', user }));
  } catch (error: any) {
    console.error('Login error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    yield put(loginFailure(
      error.response?.data?.message || error.message || 'Login failed'
    ));
  }
}

function* logoutSaga(): Generator<any, void, any> {
  try {
    yield call(apiClient.post, API_ENDPOINTS.auth.logout);
  } catch (error: any) {
    console.error('Logout error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
  }
  // Clear token from localStorage
  localStorage.removeItem('token');
  yield put(logout());
}

function* restoreSessionSaga(): Generator<any, void, any> {
  const token = localStorage.getItem('token');
  if (!token) {
    yield put(logout());
    return;
  }

  try {
    const response: AxiosResponse<{ user: LoginResponse['user'] }> = yield call(
      apiClient.get,
      API_ENDPOINTS.auth.me
    );
    yield put(loginSuccess({ message: 'Session restored', user: response.data.user }));
  } catch (error) {
    localStorage.removeItem('token');
    yield put(logout());
  }
}

export function* watchAuthSaga(): Generator {
  yield takeLatest(loginRequest.type, loginSaga);
  yield takeLatest(logoutActionSaga.type, logoutSaga);
  yield takeLatest(restoreSessionRequest.type, restoreSessionSaga);
}
