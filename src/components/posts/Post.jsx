import React, { useContext, useState } from "react";
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
  ShowCommentsModal,
  ConformDeleteModal,
  ButtonContainer,
} from "./PostElements";
import {
  deletePost,
  updatePostData,
  updateUserPost,
} from "../state/actionCreators";
import {
  FollowButton,
  ModalStyles,
  ModalTitle,
} from "../Profile/ProfileElements";
import { toast } from "react-toastify";
import { toastEmmiterOptions } from "../../utils/toastSettings";
ShowCommentsModal.setAppElement("#root");
function Card({
  description,
  url,
  likes,
  id,
  name,
  userId,
  imageUrl,
  comments = [],
}) {
  const [state, dispatch] = useContext(Store);
  const { user } = state;
  const [isPostLiked, setIsPostLiked] = useState(likes?.includes(user._id));
  const [noOfLikes, setNoOfLikes] = useState(likes?.length);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [isDelModalOpen, setIsDelModalOpen] = useState(false);

  const handlePostLike = () => {
    setNoOfLikes((prev) => prev + 1);
    setIsPostLiked((prev) => !prev);
    fetch(`${process.env.REACT_APP_API_URL}/posts/like`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer:${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({ postID: id }),
    })
      .then((res) => res.json())
      .then((updatedPost) => {
        dispatch(updatePostData(updatedPost));
        if (user._id === updatedPost.postedBy?._id)
          dispatch(updateUserPost(updatedPost));
      })
      .catch((err) =>
        toast.error("something went wrong ", toastEmmiterOptions)
      );
  };

  const handleCommentOnPost = async () => {
    try {
      const updatedPostJson = await fetch(
        `${process.env.REACT_APP_API_URL}/posts/comment`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer:${localStorage.getItem("jwt")}`,
          },
          body: JSON.stringify({ postID: id, text: comment }),
        }
      );
      const updatedPost = await updatedPostJson.json();
      dispatch(updatePostData(updatedPost));
    } catch (error) {
      toast.error("oops please try after some time", toastEmmiterOptions);
    }
    setComment("");
  };

  const handlePostUnLike = () => {
    setNoOfLikes((prev) => prev - 1);
    setIsPostLiked((prev) => !prev);
    fetch(`${process.env.REACT_APP_API_URL}/posts/unlike`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer:${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({ postID: id }),
    })
      .then((res) => res.json())
      .then((updatedPost) => {
        dispatch(updatePostData(updatedPost));
        if (user._id === updatedPost.postedBy?._id)
          dispatch(updateUserPost(updatedPost));
      })
      .catch((err) =>
        toast.error("something went wrong ", toastEmmiterOptions)
      );
  };

  const hanldePostDelete = () => {
    fetch(`${process.env.REACT_APP_API_URL}/posts/delete/${id}`, {
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
            <DeleteText onClick={() => setIsDelModalOpen(true)}>
              Delete
            </DeleteText>
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
          onClick={() => setIsModalOpen(true)}
        >
          see all comments
        </PostDescriptionStrong>
        <ShowCommentsModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          style={ModalStyles}
        >
          <ModalTitle>Comments</ModalTitle>
          {comments.map(({ postedBy, text }, index) => (
            <Comment key={index}>
              <PostDescriptionStrong>{postedBy.name}</PostDescriptionStrong>
              {text}
            </Comment>
          ))}
        </ShowCommentsModal>
        <ConformDeleteModal
          isOpen={isDelModalOpen}
          onRequestClose={() => setIsDelModalOpen(false)}
          style={ModalStyles}
        >
          <h3>Are you sure you want to delete the post</h3>
          <ButtonContainer>
            <FollowButton onClick={hanldePostDelete}>Yes</FollowButton>
            <FollowButton onClick={() => setIsDelModalOpen(false)}>
              No
            </FollowButton>
          </ButtonContainer>
        </ConformDeleteModal>
      </PostContent>
    </PostArticle>
  );
}

export default Card;
