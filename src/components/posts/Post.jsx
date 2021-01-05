import React, { useContext, useState } from "react";
import { DeleteIcon, PostedByName, SubmitDetailsIcon } from "./PostElements";
import { confirmAlert } from "react-confirm-alert";
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
  CommentContainer,
} from "./PostElements";

function Card({ title, description, url, likes, id, name, userId }) {
  const [state, dispatch] = useContext(Store);
  const { user } = state;
  const [isPostLiked, setIsPostLiked] = useState(likes.includes(user._id));
  const [noOfLikes, setNoOfLikes] = useState(likes.length);
  const [comment, setComment] = useState("");
  const confirmDelete = () => {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure to delete this",
      buttons: [
        {
          label: "Yes",
          onClick: () => hanldePostDelete(),
        },
        {
          label: "No",
          onClick: () => alert("Not deleted"),
        },
      ],
    });
  };
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

  const handleCommentOnPost = () => {
    fetch("http://localhost:4000/posts/comment", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer:${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({ postID: id, text: comment }),
    }).then((res) => console.log(res.json()));
    setComment("");
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

  const hanldePostDelete = () => {
    fetch(`http://localhost:4000/posts/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer:${localStorage.getItem("jwt")}`,
      },
    }).then((res) => {
      dispatch(id);
    });
  };
  return (
    <CardDiv>
      <CardHeader>
        <CardHeaderImage src={null} />
        <PostedByName>{name}</PostedByName>
        {user._id === userId && (
          <DeleteIcon onClick={confirmDelete} size={30} />
        )}
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
        <CommentContainer>
          <PostComment
            value={comment}
            onChange={({ target }) => setComment(target.value)}
            placeholder="add a comment"
          />
          <SubmitDetailsIcon
            onClick={comment.length > 0 ? handleCommentOnPost : null}
            comment={comment.length}
            size="24px"
          />
        </CommentContainer>
      </CardContent>
    </CardDiv>
  );
}

export default Card;
