import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { auth, db, userPostCollection } from '../firebase/firebase';
import { getDoc, doc, setDoc } from 'firebase/firestore';
import { authActions } from '../store/authSlice';
import { HOMEPAGE, LANDING } from '../routes';

export const signUpHandler = createAsyncThunk(
  'auth/signUpHandler',
  async (initialPost, { rejectWithValue }) => {
    try {
      const { username, email, password, navigate } =
        initialPost;
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const resUser = await response?.user;
      const { accessToken, uid } = resUser;
      const userObj = {
        uid,
        username,
        email,
        notes: [],
        tasks: []
      };
      await setDoc(doc(db, userPostCollection, uid), userObj);
      localStorage.setItem(
        'user',
        JSON.stringify({
          uid,
          username,
          email,
          notes: userObj.notes,
          tasks: userObj.tasks
        })
      );
      localStorage.setItem('token', JSON.stringify(accessToken));
      navigate(HOMEPAGE);
      return { accessToken, userObj };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signInHandler = createAsyncThunk(
  'auth/signInHandler',
  async (initialPost, { rejectWithValue }) => {
    try {
      const { email, password, navigate } = initialPost;
      const response = await signInWithEmailAndPassword(auth, email, password);
      const resUser = await response?.user;
      const { accessToken, uid } = resUser;
      const docRef = doc(db, userPostCollection, uid);
      const docSnap = await getDoc(docRef);
      const userObj = docSnap.data();
      localStorage.setItem('user', JSON.stringify(userObj));
      localStorage.setItem('token', JSON.stringify(accessToken));
      navigate(HOMEPAGE);
      return { accessToken, userObj };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signOutHandler = createAsyncThunk(
  'auth/signOutHandler',
  async (initialPost, { rejectWithValue }) => {
    const { dispatch, navigate } = initialPost;
    signOut(auth)
      .then(() => {
        localStorage.clear();
        dispatch(authActions.getToken(''));
        navigate(LANDING);
      })
      .catch((error) => {
        return rejectWithValue(error.message);
      });
  }
);
