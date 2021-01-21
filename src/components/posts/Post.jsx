import React, { useContext, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { Store } from "../state/Store";

import {
  Comment,
  PostContent,
  PostDescription,
  PostHeader,
  PostUser,
  DeleteText,
  PostUserName,
  CommentIcon,
  LikeIconDiv,
  PostImage,
  PostDescriptionP,
  PostCommentInput,
  CommentContainer,
  FilledHeartIcon,
  OpenHeartIcon as UnFilledHeartIcon,
  PostImageDiv,
  PostArticle,
  PostUserImageDiv,
  PostUserNameDiv,
  PostImageBackground,
  PostUserImage,
  PostDescriptionStrong,
  ShowComments,
} from "./PostElements";
import { deletePost } from "../state/actionTypes";
ShowComments.setAppElement("#root");
function Card({
  description,
  url,
  likes,
  id,
  name,
  userId,
  imageUrl,
  comments,
}) {
  const [state, dispatch] = useContext(Store);
  const { user } = state;
  const [isPostLiked, setIsPostLiked] = useState(likes.includes(user._id));
  const [noOfLikes, setNoOfLikes] = useState(likes.length);
  const [isModalOpen, SetIsModalOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [postComments, setPostComments] = useState(comments);
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
    setPostComments((prev) => [
      ...prev,
      { postedBy: user.name, text: comment },
    ]);
    fetch("http://localhost:4000/posts/comment", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer:${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({ postID: id, text: comment }),
    })
      .then((res) => console.log(res.json()))
      .catch(postComments.pop());
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
      dispatch(deletePost(id));
    });
  };
  return (
    <PostArticle>
      <PostHeader>
        <PostUser>
          <PostUserImageDiv>
            <PostUserImage src={imageUrl} />
          </PostUserImageDiv>
          <PostUserNameDiv>
            <PostUserName
              to={user._id === userId ? "/profile" : `/profile/${userId}`}
            >
              {name}
            </PostUserName>
          </PostUserNameDiv>
          {user._id === userId && (
            <DeleteText onClick={confirmDelete}>Delete</DeleteText>
          )}
        </PostUser>
      </PostHeader>
      {url && (
        <PostImageDiv>
          <PostImageBackground>
            <PostImage src={url} />
          </PostImageBackground>
        </PostImageDiv>
      )}
      <PostContent>
        <PostDescription>
          <PostDescriptionStrong>{name}</PostDescriptionStrong>
          <PostDescriptionP>{description}</PostDescriptionP>
        </PostDescription>
        <LikeIconDiv>
          {isPostLiked ? (
            <FilledHeartIcon color="red" size={30} onClick={handlePostUnLike} />
          ) : (
            <UnFilledHeartIcon size={30} onClick={handlePostLike} />
          )}
          <h2>{noOfLikes}</h2>
        </LikeIconDiv>

        <CommentContainer>
          <PostCommentInput
            value={comment}
            onChange={({ target }) => setComment(target.value)}
            placeholder="add a comment"
          />
          <CommentIcon
            onClick={comment.length > 0 ? handleCommentOnPost : null}
            comment={comment.length}
            size="24px"
          />
        </CommentContainer>
        <PostDescriptionStrong
          style={{ color: "grey" }}
          onClick={() => SetIsModalOpen(true)}
        >
          see all comments
        </PostDescriptionStrong>
        <ShowComments
          isOpen={isModalOpen}
          onRequestClose={() => SetIsModalOpen(false)}
          style={{
            overlay: {
              backgroundColor: "rgba(63, 59, 59, 0.75)",
            },
          }}
        >
          {postComments.map(({ postedBy, text }, index) => (
            <Comment key={index}>
              <PostDescriptionStrong>{postedBy.name}</PostDescriptionStrong>
              {text}
            </Comment>
          ))}
        </ShowComments>
      </PostContent>
    </PostArticle>
  );
}

export default Card;
