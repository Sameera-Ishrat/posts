import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const editPost = createAsyncThunk("posts/editPost", async (updatedPosts, thunkAPI) => {
    try {
      console.log('Making API call to update post:', updatedPosts);
  
      const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${updatedPosts.id}`, updatedPosts);
  
      console.log('API response:', response.data);
  
      return response.data;
    } catch (error) {
      console.error('API call failed with error:', error.message);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  });

const initialState = {
    editData: 'null',
  editMode: false,
  loading: false,
  error: null,   // You may want to track error state
};

const editSlice = createSlice({
  name: 'postEdit',
  initialState: initialState,
  reducers: {
    setEditData: (state, action) => {
      state.editData = action.payload;
    },
    setEditMode: (state, action) => {
      state.editMode = action.payload;
    },
    resetEdit: (state) => {
        state.editData = null;
        state.editMode = false;
        state.loading = false;
        state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(editPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.loading = false;
        state.editData = action.payload;
        const index = state.posts.findIndex((post) => post.id === action.payload.id);
      
      // Update the post in the state
      state.posts[index] = action.payload;
      })
      .addCase(editPost.rejected, (state, action) => {
        state.loading = false;
      state.error = action.payload.error.message;
      
});
  }
})

export default editSlice.reducer;
export const { setEditData, setEditMode, resetEdit } = editSlice.actions;
