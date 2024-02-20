import { createSlice ,createAsyncThunk  } from "@reduxjs/toolkit";

import axios from "axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts" , async(_,thunkAPI) => {
try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
    console.log(response.data);
    return response.data;
}catch(error) {
return thunkAPI.rejectWithValue({error: error.message});
}
});

export const deletePost = createAsyncThunk("posts/deletePost" , async(id,thunkAPI) => {
    try {
        const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
        console.log(response.data);
        return id;
    }catch(error) {
    return thunkAPI.rejectWithValue({error: error.message});
    }
});




const initialState = {
    posts : [],
    loading : false,
    error:null
}
const postSlice = createSlice({
name : 'posts',
initialState,
reducers : {
createPost : (state,action) => {
    state.posts.unshift(action.payload)
},
// Add a reducer for updating the post in the state
setPost : (state,action) => {
    state.posts = action.payload;
},
updatePost: (state, action) => {
    const index = state.posts.findIndex(post => post.id === action.payload.id);
    if (index !== -1) {
      state.posts[index] = action.payload;
    }
  },
},
extraReducers : (builder) => {
    builder.addCase(fetchPosts.pending,(state,action) => {
        state.loading = true;
    }).addCase(fetchPosts.fulfilled,(state,action) =>{
state.loading = false;
state.posts = action.payload;
    }).addCase(fetchPosts.rejected,(state,action) =>{
        console.log(action.payload,"Rejected");
        state.loading = false;
        state.error = action.error;
    }).addCase(deletePost.fulfilled,(state,action) =>{
        state.loading = false;
        state.error = '';
        console.log(action.payload,"for delete post");
       state.posts = state.posts.filter((post) => post.id !== action.payload);    
    })
}
})
export default postSlice.reducer;
export const {createPost,setPost,updatePost}  = postSlice.actions;