import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPosts } from "./features/posts/postSlice";
import Posts from "./components/Posts";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NewPost from "./components/NewPost";

function App() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="container">
   <NewPost {...posts} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Posts posts={posts} />} />      
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
