import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import storyReducer from './storyReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  story: storyReducer,
});

export default rootReducer;

