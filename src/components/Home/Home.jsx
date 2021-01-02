import React from "react";
import Post from "../user-posts/Post";

function Home() {
  return (
    <div style={{ margin: "0 auto", width: "935px" }}>
      <Post />
      <Post />
      <Post />
    </div>
  );
}

export default Home;
