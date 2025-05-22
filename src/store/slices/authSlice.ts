import {createAction, createSlice} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: number;
  username: string;
  role: 'admin' | 'survivor' | 'nikita';
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  loadingRestoreSession: boolean
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  loadingRestoreSession: false
};

export const logoutActionSaga = createAction<string>('logoutActionSaga')

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state, action: PayloadAction<{ username: string; password: string }>) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{ message: string; user: User }>) => {
      state.user = action.payload.user;
      state.loading = false;
      state.error = null;
      state.loadingRestoreSession = false
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.error = null;
      state.loadingRestoreSession = false
    },
    restoreSessionRequest: (state) => {
      state.loadingRestoreSession = true;
      state.error = null;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout, restoreSessionRequest } = authSlice.actions;
export default authSlice.reducer;
