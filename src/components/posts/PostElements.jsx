import styled from "styled-components";
import Modal from "react-modal";
import { AiFillHeart, AiOutlineHeart, AiOutlineSend } from "react-icons/ai";
import { Link } from "react-router-dom";

export const PostArticle = styled.article`
  border-radius: 3px;
  border: 1px solid #e6e6e6;
  background-color: #fff;
  margin-bottom: 60px;
  margin-left: 20%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-left: 4px solid rgba(213, 219, 213, 0.5);
  margin-right: 20%;
`;
export const PostImageDiv = styled.div``;
export const PostImage = styled.img`
  display: block;
  width: 100%;
`;
export const PostHeader = styled.header`
  border-bottom: 1px solid rgba(239, 239, 239, 1);
`;

export const PostUser = styled.div`
  display: flex;
  padding: 12px;
  align-items: center;
`;
export const PostUserImage = styled.img`
  width: 30px;
  object-fit: "contain";
  border-radius: 50%;
`;
export const PostUserImageDiv = styled.div`
  width: 30px;
  height: auto;
  overflow: hidden;
`;
export const PostUserNameDiv = styled.div`
  margin-left: 12px;
  font-family: "PT Sans", sans-serif;
  font-weight: bold;
`;
export const PostContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  justify-content: space-between;
  border-bottom: 1px solid lightblue;
`;

export const PostDescription = styled.div`
  padding: 10px 16px;
  display: flex;
`;

export const PostDescriptionStrong = styled.strong`
  margin-right: 10px;
  font-weight: bold;
  padding: 0 6px;
  font-size: 19px;
  color: #000;
  cursor: pointer;
`;

export const PostDescriptionP = styled.p`
  font-size: 19px;
`;

export const PostCommentInput = styled.input`
  width: 100%;
  outline: none;
  height: 30px;
  display: block;
  border: none;
  font-size: 18px;
  transition: 0.2s;
`;
export const LikeIconDiv = styled.div`
  display: flex;
  padding: 5px 15px;
  margin: 15px 0;
  align-items: center;
`;
export const OpenHeartIcon = styled(AiOutlineHeart)`
  color: black;
  margin-right: 10px;
  cursor: pointer;
`;
export const FilledHeartIcon = styled(AiFillHeart)`
  color: ${({ color }) => color || "#FFF"};
  display: block;
  margin-right: 10px;
  cursor: pointer;
`;
export const CommentContainer = styled.div`
  display: flex;
  margin: 10px 0;
  padding: 16px 0px;
  border-bottom: 1px solid rgba(239, 239, 239, 1);
`;
export const CommentIcon = styled(AiOutlineSend)`
  margin-right: 10px;
  color: ${({ comment }) => (comment > 0 ? "royalblue" : "grey")};
  cursor: ${({ comment }) => (comment > 0 ? "pointer" : "")};
`;
export const DeleteText = styled.h2`
  color: red;
  margin-left: 300px;
  font-size: 18px;
  text-transform: uppercase;
  cursor: pointer;
  transition: 0.2s all;
  :hover {
    transform: scale(1.1);
  }
`;

export const PostImageBackground = styled.div`
  background-color: #efefef;
`;

export const PostUserName = styled(Link)`
  font-weight: bold;
  font-size: 16px;
  margin-left: 20px;
  text-decoration: none;
  color: #333;
  font-family: "Montserrat";
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;

export const ShowCommentsModal = styled(Modal)`
  height: 400px;
  width: 400px;
  margin: 150px auto;
  padding: 15px 20px;
  border-radius: 30px;
  outline: none;
  background: #fff;
`;

export const Comment = styled.p`
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  border-bottom: 1.5px solid lightgrey;
  padding: 10px 16px;
  font-size: 19px;
`;

export const ConformDeleteModal = styled(Modal)`
  height: 200px;
  width: 400px;
  margin: 150px auto;
  padding: 15px 20px;
  border-radius: 30px;
  outline: none;
  background: #fff;
`;

export const ButtonContainer = styled.div`
  display: flex;
  padding: 10px;
  justify-content: space-between;
  margin-top: 40px;
`;
