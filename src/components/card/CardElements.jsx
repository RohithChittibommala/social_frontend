import styled from "styled-components";
import fonts from "../../configs/fonts";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { iconStyles } from "../Login_Register/LoginElements";
export const CardDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 614px;

  min-height: 700px;
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
  border-bottom: 1px solid #lightblue;
`;
export const CardTitle = styled.h1`
  font-family: ${fonts.cardFont};
  font-weight: 600;
  font-size: 25px;
  margin: 10px 0;
`;
export const CardDescription = styled.p`
  margin: 10px 0;
  font-size: 18px;
`;
export const CardInput = styled.input`
  width: 100%;
  outline: none;
  height: 30px;
  display: block;
  -webkit-box-sizing: border-box;
  // padding: 15px;
  border: none;
  font-size: 18px;
`;
export const CardIconsDiv = styled.div`
  dispaly: flex;
  padding: 12px;
  align-items: center;
  height: 60px;
  position: relative;
`;
export const OpenHeartIcon = styled(AiFillHeart)`
  color: black;
  position: relative;
  top: 10px;
  margin-right: 10px;
  cursor: pointer;
`;
export const FilledHeartIcon = styled(AiFillHeart)`
  color: red;
  position: relative;
  top: 10px;
  margin-right: 10px;
  cursor: pointer;
`;
