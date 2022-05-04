import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  signOut
} from 'firebase/auth';
import { auth, db, userCollection } from '../firebase/firebase';
import {
  getDoc,
  doc,
  setDoc,
  collection
} from 'firebase/firestore';

const initialState = {
  token: '',
  authLoader: 'idle',
  email: '',
  username: ''
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {}
});

export const authActions = authSlice.actions;
export default authSlice;
