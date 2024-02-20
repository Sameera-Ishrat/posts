import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { deletePost } from "../features/posts/postSlice";
import Card from "../UI/Card";

import { setPostEdit } from "../features/editSlice/editSlice";

const Posts = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  const { item} = useSelector((state) => state.postEdit);
  console.log(item.title , "editPost item title");

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
            <button onClick={() => {
              console.log('edit post clicked',post.id);
              dispatch(setPostEdit(post));
            }}>Edit</button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Posts;
