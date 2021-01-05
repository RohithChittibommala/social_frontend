import styled from "styled-components";
import fonts from "../../utils/fonts";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineSend,
  AiFillDelete,
} from "react-icons/ai";

export const CardDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 614px;
  min-height: 100px;
  height: auto;
  margin: 100px auto;
  border: 1px solid #8ab7d1;
  background: #fff;
`;
export const CardImageDiv = styled.div`
  height: auto;
`;
export const CardImage = styled.img`
  width: 100%;
`;
export const CardHeader = styled.div`
  display: flex;
  height: 60px;
  align-items: center;
  background: #fff;
  padding: 12px;
`;
export const CardHeaderImage = styled.img`
  width: 30px;
  object-fit: "contain";
  border-radius: 50%;
`;
export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  justify-content: space-between;
  border-bottom: 1px solid lightblue;
`;
export const CardTitle = styled.h1`
  font-family: ${fonts.cardFont};
  font-weight: 600;
  font-size: 25px;
  margin: 10px 0;
`;
export const CardDescription = styled.p`
  margin: 15px 0;
  font-size: 18px;
`;
export const PostComment = styled.input`
  width: 100%;
  outline: none;
  height: 30px;
  display: block;
  border: none;
  font-size: 18px;
  transition: 0.2s;
  &:focus {
    border-bottom: 1px solid blue;
  }
`;
export const CardIconsDiv = styled.div`
  display: flex;
  padding: 5px 15px;
  align-items: center;
  height: 50px;
  position: relative;
`;
export const OpenHeartIcon = styled(AiOutlineHeart)`
  color: black;
  position: relative;
  margin-right: 10px;
  cursor: pointer;
`;
export const FilledHeartIcon = styled(AiFillHeart)`
  color: red;
  position: relative;
  /* top: 10px; */
  display: block;
  margin-right: 10px;
  cursor: pointer;
`;
export const CommentContainer = styled.div`
  display: flex;
`;
export const SubmitDetailsIcon = styled(AiOutlineSend)`
  margin-right: 10px;
  color: ${({ comment }) => (comment > 0 ? "royalblue" : "grey")};
  cursor: ${({ comment }) => (comment > 0 ? "pointer" : "")};
`;
export const DeleteIcon = styled(AiFillDelete)`
  color: red;
  margin-left: 300px;
  cursor: pointer;
  transition: 0.2s all;
  :hover {
    transform: scale(1.1);
  }
`;

export const PostedByName = styled.h3`
  font-weight: bold;
  font-size: 16px;
  margin-left: 20px;
  font-family: "Montserrat";
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;
