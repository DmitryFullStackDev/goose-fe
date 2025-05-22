import { createSlice } from '@reduxjs/toolkit';

export type ServerStatus = 'unknown' | 'waking' | 'awake' | 'error';

interface ServerState {
  status: ServerStatus;
}

const initialState: ServerState = {
  status: 'unknown',
};

const serverSlice = createSlice({
  name: 'server',
  initialState,
  reducers: {
    wakeUpServerRequest: (state) => {
      state.status = 'waking';
    },
    wakeUpServerSuccess: (state) => {
      state.status = 'awake';
    },
    wakeUpServerFailure: (state) => {
      state.status = 'error';
    },
    resetServerStatus: (state) => {
      state.status = 'unknown';
    },
  },
});

export const {
  wakeUpServerRequest,
  wakeUpServerSuccess,
  wakeUpServerFailure,
  resetServerStatus,
} = serverSlice.actions;

export default serverSlice.reducer; 