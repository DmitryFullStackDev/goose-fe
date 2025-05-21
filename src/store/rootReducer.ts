import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import roundsReducer from './slices/roundsSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  rounds: roundsReducer,
});

export default rootReducer; 