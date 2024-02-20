import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const editPost = createAsyncThunk(
  "posts/editPost",
  async (postData, thunkAPI) => {
    try {
      console.log("Making API call to update post:", postData.id);

      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${postData.id}`,
        postData
      );

      console.log("API response:", response.data);
      // Assuming response.data contains the updated post data
      thunkAPI.dispatch(updatedPostItem(response.data));

      return response.data;
    } catch (error) {
      console.error("API call failed with error:", error.message);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const initialState = {
  posts: [],
  item: {},
  edit: false,
  loading: false,
  error: null, // You may want to track error state
};

const editSlice = createSlice({
  name: "postEdit",
  initialState: initialState,
  reducers: {
    setPostEdit: (state, action) => {
      state.item = action.payload;
      state.edit = Boolean(action.payload);
    },
    resetEdit: (state) => {
      state.item = {};
      state.edit = false;
    },
    editPostItem: (state, action) => {
      console.log(action.payload, "edit post item");
      if (action.payload && action.payload.item) {
        state.item = action.payload.item;
        state.edit = false;
        // Set edit to false after updating the post
      } else {
        // Handle the case where payload or item is undefined
        console.error(
          "Invalid payload structure in editPostItem",
          action.payload
        );
      }
    },
    updatedPostItem: (state, action) => {
      const updatedPost = action.payload;
      state.posts = state.posts.map((post) =>
        post.id === updatedPost.id ? updatedPost : post
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(editPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editPost.fulfilled, (state, action) => {
        console.log("State before the edit post", { ...state });
        state.loading = false;
        state.edit = false;

        const updatedPost = action.payload;

        // Check if the post already exists in the array
        const existingPostIndex = state.posts.findIndex(
          (post) => post.id === updatedPost.id
        );

        if (existingPostIndex !== -1) {
          // If the post exists, update it in the array
          state.posts[existingPostIndex] = updatedPost;
        } else {
          // If the post doesn't exist, add it to the array
          state.posts = [...state.posts, updatedPost];
        }

        state.item = updatedPost;
        console.log("State after the edit post", { ...state });
      })
      .addCase(editPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error.message;
        console.error("Error details:", action.payload);
      });
  },
});

export default editSlice.reducer;
export const { editPostItem, setPostEdit, updatedPostItem, resetEdit } =
  editSlice.actions;
