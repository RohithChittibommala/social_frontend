import React, { useContext, useState } from "react";
import { ProfileStatNum } from "../Profile/ProfileElements";
import { Store } from "../state/Store";
import {
  CardContent,
  CardDescription,
  CardDiv,
  CardHeader,
  CardHeaderImage,
  CardIconsDiv,
  CardImage,
  CardImageDiv,
  PostComment,
  CardTitle,
  FilledHeartIcon,
  OpenHeartIcon,
} from "./PostElements";

function Card({ title, description, url, likes, id }) {
  const [state] = useContext(Store);
  const { user } = state;
  const [isPostLiked, setIsPostLiked] = useState(likes.includes(user._id));
  const [noOfLikes, setNoOfLikes] = useState(likes.length);
  const handlePostLike = () => {
    setNoOfLikes((prev) => prev + 1);
    setIsPostLiked((prev) => !prev);
    fetch("http://localhost:4000/posts/like", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer:${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({ postID: id }),
    })
      .then((res) => console.log(res.json()))
      .catch((err) => console.error(err));
  };
  const handlePostUnLike = () => {
    setNoOfLikes((prev) => prev - 1);
    setIsPostLiked((prev) => !prev);
    fetch("http://localhost:4000/posts/unlike", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer:${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({ postID: id }),
    })
      .then((res) => console.log(res.json()))
      .catch((err) => console.error(err));
  };
  return (
    <CardDiv>
      <CardHeader>
        <CardHeaderImage src={null} />
      </CardHeader>
      {url && (
        <CardImageDiv>
          <CardImage src={url} />
        </CardImageDiv>
      )}

      {isPostLiked ? (
        <CardIconsDiv>
          <FilledHeartIcon size={30} onClick={handlePostUnLike} />
          <h2>{noOfLikes}</h2>
        </CardIconsDiv>
      ) : (
        <CardIconsDiv>
          <OpenHeartIcon size={30} onClick={handlePostLike} />
          <h2>{noOfLikes}</h2>
        </CardIconsDiv>
      )}
      <CardContent>
        {title && <CardTitle>{title}</CardTitle>}
        {description && <CardDescription>{description}</CardDescription>}
        <PostComment placeholder="add a comment" />
      </CardContent>
    </CardDiv>
  );
}

export default Card;
