import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth, db, userPostCollection } from '../firebase/firebase';
import { collection, updateDoc } from 'firebase/firestore';

export const signUpHandler = createAsyncThunk(
  'auth/updatePostHandler',
  async (initialPost, { rejectWithValue }) => {
    try {
      const { username, email, uid, notes } = initialPost;
      const docRef = collection(db, userPostCollection, uid);
      const response = await updateDoc(docRef);

      //   localStorage.setItem(
      //     'user',
      //     JSON.stringify({ uid, username, email, notes: userObj.notes })
      //   );
      //   return { accessToken, userObj };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
