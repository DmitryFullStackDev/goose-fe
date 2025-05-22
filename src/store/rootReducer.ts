import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import roundsReducer from './slices/roundsSlice';
import serverReducer from './slices/serverSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  rounds: roundsReducer,
  server: serverReducer,
});

export default rootReducer; 