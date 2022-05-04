import { createSlice } from '@reduxjs/toolkit';
import {
  signUpHandler,
  signInHandler,
  signOutHandler
} from '../actions/authActions';

const initialState = {
  authLoader: 'idle',
  error: '',
  token: '',
  user: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getToken(state, action) {
      state.token = action.payload;
    },
    getUser(state, action) {
      state.user = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(signUpHandler.pending, (state, action) => {
        state.authLoader = 'pending';
      })
      .addCase(signUpHandler.fulfilled, (state, action) => {
        state.authLoader = 'fulfilled';
        const { accessToken, userObj } = action.payload;
        const { uid, username, email, notes } = userObj;
        state.user = { uid, username, email, notes };
        state.token = accessToken;
      })
      .addCase(signUpHandler.rejected, (state, action) => {
        state.authLoader = 'rejected';
        state.error = action.error.message;
      })
      .addCase(signInHandler.pending, (state, action) => {
        state.authLoader = 'pending';
      })
      .addCase(signInHandler.fulfilled, (state, action) => {
        state.authLoader = 'fulfilled';
        const { accessToken, userObj } = action.payload;
        const { uid, username, email, notes } = userObj;
        state.user = { uid, username, email, notes };
        state.token = accessToken;
      })
      .addCase(signInHandler.rejected, (state, action) => {
        state.authLoader = 'rejected';
        state.error = action.error.message;
      })
      .addCase(signOutHandler.fulfilled, (state, action) => {
        state.authLoader = 'idle';
        state.user = {};
        state.token = '';
      });
  }
});

export const authActions = authSlice.actions;
export default authSlice;
