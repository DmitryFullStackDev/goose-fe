import { call, put, takeLatest } from 'redux-saga/effects';
import type { PayloadAction } from '@reduxjs/toolkit';
import { loginRequest, loginSuccess, loginFailure } from '../slices/authSlice';
import { apiClient, API_ENDPOINTS } from '../../config/api';
import type { AxiosResponse } from 'axios';

interface LoginResponse {
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

    yield put(loginSuccess({
      message: 'Login successful',
      user: response.data.user
    }));
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

export function* watchAuthSaga(): Generator {
  yield takeLatest(loginRequest.type, loginSaga);
}
