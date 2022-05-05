import { createAsyncThunk } from '@reduxjs/toolkit';
import { db, userPostCollection } from '../firebase/firebase';
import { getDoc, doc, updateDoc } from 'firebase/firestore';

export const updatePostHandler = createAsyncThunk(
  'auth/updatePostHandler',
  async (initialPost, { rejectWithValue }) => {
    try {
      const { uid, note } = initialPost;
      await updateDoc(doc(db, userPostCollection, uid), note);
      const docRef = doc(db, userPostCollection, uid);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      localStorage.setItem('user', JSON.stringify(data));
      return { data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
