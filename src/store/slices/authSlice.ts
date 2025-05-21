import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getCookie, setCookie, removeCookie } from '../../utils/cookies';

interface User {
  id: number;
  username: string;
  role: 'admin' | 'survivor' | 'nikita';
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: getCookie('USER'),
  loading: false,
  error: null,
};

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
      setCookie('USER', action.payload.user);
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.error = null;
      removeCookie('USER');
    },
    restoreSession: (state) => {
      const user = getCookie('USER');
      if (user) {
        state.user = user;
      }
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout, restoreSession } = authSlice.actions;
export default authSlice.reducer;
