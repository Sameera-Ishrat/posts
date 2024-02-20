import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { updatePost } from "../posts/postSlice";

export const editPost = createAsyncThunk(
  "posts/editPost",
  async (id, thunkAPI) => {
    try {
      console.log("Making API call to update post:", id);

      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${id}`  
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
            console.error("Invalid payload structure in editPostItem",action.payload);
          }
    },
//     updatedPostItem: (state, action) => {
//         const updatedPost = action.payload; // Assuming the payload contains the updated post
//   const existingPostIndex = state.posts.findIndex(post => post.id === updatedPost.id);

//   if (existingPostIndex !== -1) {
//     // Replace the existing post with the updated one
//     state.posts[existingPostIndex] = updatedPost;
//   }
//       },
  },
  extraReducers: (builder) => {
    builder
      .addCase(editPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.loading = false;
        state.edit = false; // Set edit mode to false after successful edit
        state.item = action.payload;
        state.posts.push(action.payload); // Add the updated post to the posts array
        console.log("State after edit post:", state);
      })
      .addCase(editPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error.message;
      });
  },
});

export default editSlice.reducer;
export const { editPostItem,setPostEdit,resetEdit } = editSlice.actions;
// Add a separate action to update the post in the state
export const updatedPostItem = (updatedPost) => (dispatch) => {
    dispatch(editPostItem({ item: updatedPost }));
  };