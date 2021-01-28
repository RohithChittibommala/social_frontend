import React, { useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { PropagateLoader } from "react-spinners";
import Post from "../posts/Post";
import { Store } from "../state/Store";
import {
  fetchedPosts,
  fetchedUserPosts,
  updateCurrentPageCount,
  updateTotalNoOfPosts,
  userLoggedIn,
} from "../state/actionCreators";
import { toastEmmiterOptions } from "../../utils/toastSettings";

function Home() {
  const [state, dispatch] = useContext(Store);
  const { currentPageCount, noOfPostsInDB, posts, isFirstLoad } = state;
  const jwt = localStorage.getItem("jwt");
  const history = useHistory();

  useEffect(() => {
    if (!jwt) history.push("/login");
    if (isFirstLoad)
      fetch(`${process.env.REACT_APP_API_URL}/posts/allposts`, {
        headers: {
          Authorization: `Bearer:${jwt}`,
        },
      })
        .then((posts) => posts.json())
        .then((res) => {
          if (res.name === "JsonWebTokenError") history.push("/login");
          dispatch(updateTotalNoOfPosts(res.totalNoOfPosts));
          dispatch(updateCurrentPageCount(currentPageCount + 1));
          dispatch(userLoggedIn(res.user));
          dispatch(fetchedPosts(res.posts));
          dispatch(fetchedUserPosts(res.myPosts));
        })
        .catch((err) => {
          console.log(err);
          localStorage.clear();
          toast.error("some error ocurred please login", toastEmmiterOptions);
          history.push("/login");
        });
  }, []);
  const fetchMorePostsOnLoad = async () => {
    const postsJSON = await fetch(
      `${process.env.REACT_APP_API_URL}/posts/getmore/${currentPageCount}`,
      {
        headers: {
          Authorization: `Bearer:${jwt}`,
        },
      }
    );
    console.log("called");
    const posts = await postsJSON.json();
    dispatch(updateCurrentPageCount(currentPageCount + 1));
    dispatch(fetchedPosts(posts));
  };
  return (
    <InfiniteScroll
      className="infinite-scroll"
      dataLength={posts?.length || 0}
      next={fetchMorePostsOnLoad}
      loader={<PropagateLoader size={20} />}
      hasMore={noOfPostsInDB > currentPageCount * 5}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      {posts?.map((post) => (
        <Post
          key={post?._id}
          id={post._id}
          description={post.description}
          title={post.title}
          name={post?.postedBy?.name}
          url={post.url}
          likes={post.likes}
          userId={post?.postedBy?._id}
          imageUrl={post.postedBy?.imageUrl}
          comments={post.comments}
          createdAt={post.createdAt}
        />
      ))}
    </InfiniteScroll>
  );
}

export default Home;
