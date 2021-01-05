import React, { useEffect, useContext } from "react";
import Post from "../posts/Post";
import { Store } from "../state/Store";
import { fetchedPosts, fetchedUserPosts } from "../state/actionTypes";

function Home() {
  const [state, dispatch] = useContext(Store);
  const { isAuthenicated, posts } = state;
  useEffect(() => {
    if (isAuthenicated) {
      fetch("http://localhost:4000/posts/allposts", {
        headers: {
          Authorization: `Bearer:${localStorage.getItem("jwt")}`,
        },
      })
        .then((posts) => posts.json())
        .then((posts) => {
          dispatch(fetchedPosts(posts.posts));
          dispatch(fetchedUserPosts(posts.myPosts));
        })
        .catch((err) => console.log(err));
    }
  }, [isAuthenicated, posts.length]);
  console.log(posts);
  return (
    <div style={{ margin: "0 auto", width: "935px" }}>
      {posts.map(({ _id, title, description, url, likes, postedBy }) => (
        <Post
          key={_id}
          id={_id}
          description={description}
          title={title}
          name={postedBy.name}
          url={url}
          likes={likes}
          userId={postedBy._id}
        />
      ))}
    </div>
  );
}

export default Home;
