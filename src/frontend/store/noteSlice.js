import { createSlice } from '@reduxjs/toolkit';

// export const addNewPost = createAsyncThunk(
//   'posts/addNewPost',
//   async (initialPost) => {
//     const response = await axios.post(POSTS_URL, initialPost);
//     return response.data;
//   }
// );

const initialState = {
  notes: [],
  loader: false
};

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    toggleLoader(state, action) {
      state.loader = action.payload;
    },
    getNotes(state, action) {
      state.notes = action.payload;
    }
  }
});

export const noteActions = noteSlice.actions;
export default noteSlice;
