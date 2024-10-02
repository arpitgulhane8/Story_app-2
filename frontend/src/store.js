// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk'; // Use named export
import rootReducer from './redux/reducers'; // Adjust this path if necessary

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  // Redux DevTools integration is included by default
});

export default store;

