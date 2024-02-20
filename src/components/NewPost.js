import React, { useState, useEffect } from "react";
import { UseDispatch, useDispatch, useSelector } from "react-redux";
import { createPost } from "../features/posts/postSlice";
import { resetEdit,updatedPostItem } from "../features/editSlice/editSlice";

import { editPost, setPostEdit } from "../features/editSlice/editSlice";

const NewPost = ({ editMode, editData, posts }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  console.log("New Post", posts);

  const dispatch = useDispatch();
  const { item, edit } = useSelector((state) => state.postEdit);
  useEffect(() => {
    if (edit && item) {
      setTitle(item.title || "");
      setBody(item.body || "");
    } else {
      setTitle("");
      setBody("");
    }
  }, [item, edit]);

  const submitHandler = async(e) => {
    e.preventDefault();
    if (!title || !body) {
      setErrorMessage("Please enter a title and body");
      return;
    }

    const postData = {
      item: {
        id: editMode ? item.id : Math.random().toString(),
        title,
        body,
      },
      edit: false, // Reset edit state after updating a post
    };
    if (editMode) {
      dispatch(editPost(postData.item))
        .then((action) => {
          if (editPost.fulfilled.match(action)) {
               // Dispatch updatedPostItem to update the post in the state
        dispatch(updatedPostItem(action.payload));
        dispatch(setPostEdit(postData));
          }
        })
        .catch((error) => {
          console.error("Failed to update post:", error);
        });
    } else {
      dispatch(createPost(postData.item));
    }
       // Reset the edit state after updating or creating changes .toggles button
       dispatch(resetEdit());
    setTitle("");
    setBody("");
    setErrorMessage("");
  }

  //   try {
  //     if (editMode) {
  //       const response = await dispatch(editPost(postData.item.id));
  //       dispatch(updatedPostItem(postData.item)); // Update the post in the state
  //       dispatch(setPostEdit(postData));
  //     } else {
  //       await dispatch(createPost(postData.item));
  //     }
  //     dispatch(resetEdit());
  //     setTitle("");
  //     setBody("");
  //     setErrorMessage("");
  //   } catch (error) {
  //     console.error("Failed to update/create post:", error);
  //   }
  // };


  return (
    <div className="center form-style">
      <h1>Enter a new Post</h1>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Enter a post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          rows="4"
          cols="50"
          name="postContent"
          placeholder="Enter the post content"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <button type="submit">{edit ? 'Update Post' : 'Create Post'}</button>
      </form>
    </div>
  );
};

export default NewPost;
