import React, { useState, useEffect } from "react";
import { UseDispatch, useDispatch, useSelector } from "react-redux";
import { createPost } from "../features/posts/postSlice";
import { resetEdit, updatedPostItem } from "../features/editSlice/editSlice";

import { editPost, setPostEdit } from "../features/editSlice/editSlice";

const NewPost = ({ posts }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  console.log("New Post", posts);

  const dispatch = useDispatch();
  const { item, edit } = useSelector((state) => state.postEdit);
  const postState = useSelector((state) => state.postEdit);
  useEffect(() => {
    if (edit && item) {
      setTitle(item.title || "");
      setBody(item.body || "");
    } else {
      setTitle("");
      setBody("");
    }
  }, [item, edit]);

  const submitHandler = async (e) => {
    console.log("submit button clicked");
    e.preventDefault();
    if (!title || !body) {
      setErrorMessage("Please enter a title and body");
      return;
    }

    const postData = {
      item: {
        id: edit ? item.id : Math.random().toString(),
        title,
        body,
      },
      edit: false, // Reset edit state after updating a post
    };
    console.log("Submitting post data:", postData);

    try {
      if (edit) {
        console.log("Attempting to dispatch editPost");
        const action = await dispatch(editPost(postData.item));

        if (editPost.fulfilled.match(action)) {
          // State will be updated in the extraReducers section of editSlice
          console.log("Edit post was fulfilled");
          console.log("Updated state:", postState); // Log the current state
        } else if (editPost.rejected.match(action)) {
          console.error("Edit post was rejected:", action.error);
        }
      } else {
        console.log("Attempting to dispatch createPost");
        await dispatch(createPost(postData.item));
      }
    } catch (error) {
      console.error("Failed to update/create post:", error);
    }
    /* Reset the edit state after updating or creating changes .toggles button*/
    dispatch(resetEdit());
    setTitle("");
    setBody("");
    setErrorMessage("");
  };

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
        <button type="submit">{edit ? "Update Post" : "Create Post"}</button>
      </form>
    </div>
  );
};

export default NewPost;
