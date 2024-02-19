import React, { useState } from "react";
import { UseDispatch, useDispatch, useSelector } from "react-redux";
import { createPost } from "../features/posts/postSlice";

const NewPost = ({editMode,editData,posts}) => {
  const [title, setTile] = useState("");
  const [body, setBody] = useState("");
  const [errorMessage,setErrorMessage] = useState("");

  console.log("New Post", posts);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
   if(!title || !body) {
    setErrorMessage("Please enter a title and body");
    return;
   }

    const newPost = {
      id: Math.random().toString(),
      title: title,
      body: body,
    };
    dispatch(createPost(newPost));
    setTile("");
    setBody("");
    setErrorMessage('');
  };
  return (
    <div className="center form-style">
      <h1>Enter a new Post</h1>
{errorMessage && <p style={{color:"red"}}>{errorMessage}</p>}

      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Enter a post title"
          value={title}
          onChange={(e) => setTile(e.target.value)}
        />
        <textarea
          rows="4"
          cols="50"
          name="postContent"
          placeholder="Enter the post content"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default NewPost;

