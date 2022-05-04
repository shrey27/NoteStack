import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { auth, db, userPostCollection } from '../firebase/firebase';
import { getDoc, doc, setDoc } from 'firebase/firestore';
import { authActions } from '../store/authSlice';

export const signUpHandler = createAsyncThunk(
  'auth/signUpHandler',
  async (initialPost, { rejectWithValue }) => {
    try {
      const { username, email, password, navigate, pathname, from } =
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
        notes: []
      };
      await setDoc(doc(db, userPostCollection, uid), userObj);
      localStorage.setItem(
        'user',
        JSON.stringify({ uid, username, email, notes: userObj.notes })
      );
      localStorage.setItem('token', JSON.stringify(accessToken));
      navigate(from ?? pathname, { replace: true });
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
      const { email, password, navigate, pathname, from } = initialPost;
      const response = await signInWithEmailAndPassword(auth, email, password);
      const resUser = await response?.user;
      const { accessToken, uid } = resUser;
      const docRef = doc(db, userPostCollection, uid);
      const docSnap = await getDoc(docRef);
      const userObj = docSnap.data();
      localStorage.setItem('user', JSON.stringify(userObj));
      localStorage.setItem('token', JSON.stringify(accessToken));
      navigate(from ?? pathname, { replace: true });
      return { accessToken, userObj };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signOutHandler = createAsyncThunk(
  'auth/signOutHandler',
  async (initialPost, { rejectWithValue }) => {
    const { dispatch, navigate, pathname } = initialPost;
    signOut(auth)
      .then(() => {
        localStorage.clear();
        dispatch(authActions.getToken(''));
        navigate(pathname);
      })
      .catch((error) => {
        return rejectWithValue(error.message);
      });
  }
);
