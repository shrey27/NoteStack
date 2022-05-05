import { configureStore } from '@reduxjs/toolkit';
import noteSlice from './noteSlice';
import authSlice from './authSlice';

export const store = configureStore({
  reducer: { notes: noteSlice.reducer, auth: authSlice.reducer }
});
