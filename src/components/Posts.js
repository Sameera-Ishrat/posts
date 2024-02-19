// import React, { useState ,useEffect} from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { editPost, setEditData, setEditMode, resetEdit } from "../features/editSlice/editSlice";
// import { deletePost } from "../features/posts/postSlice";
// import NewPost from "./NewPost";

// const Posts = () => {
//   const dispatch = useDispatch();
//   const { posts } = useSelector((state) => state.posts);
//   const { editData, editMode } = useSelector((state) => state.editPost);
//   // const { editData, editMode } = useSelector((state) => {
//   //   console.log('State:', state);
//   //   return state.postEdit;
//   // });

//   useEffect(() => {
//     // When editData changes, setEditMode to true
//     if (editData) {
//       dispatch(setEditMode(true));
//     }
//   }, [editData, dispatch]);

//   const handleEditPosts = (post) => {
//     dispatch(setEditData(post));
//   };

//   const handleUpdatePost = () => {
//     // Dispatch the resetEdit action to clear edit mode and data
//     dispatch(resetEdit());
//   };

//   return (
//     <div className="App">
//      <NewPost />

//       {/* Display the list of posts with edit buttons */}
//       {posts.map((post) => (
//         <div key={post.id}>
//           <h2>{post.title}</h2>
//           <p>{post.body}</p>
//           <button onClick={() => dispatch(deletePost(post.id))}>Delete</button>
//           <button onClick={() => handleEditPosts(post)}>Edit</button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Posts;

// Posts.js

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setEditData,
  setEditMode,
  resetEdit,
} from "../features/editSlice/editSlice";
import { deletePost } from "../features/posts/postSlice";
import Card from "../UI/Card";

const Posts = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  const { editData, editMode } = useSelector((state) => state.editPost);

  useEffect(() => {
    // When editData changes, setEditMode to true
    if (editData) {
      dispatch(setEditMode(true));
    }
  }, [editData, dispatch]);

  const handleEditPosts = (post) => {
    dispatch(setEditData(post));
  };

  return (
    <div className="App">
      {/* Display the list of posts with edit buttons */}
      {posts.map((post) => (
        <Card key={post.id}>
          <div>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <button onClick={() => dispatch(deletePost(post.id))}>
              Delete
            </button>
            <button onClick={() => handleEditPosts(post)}>Edit</button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Posts;
