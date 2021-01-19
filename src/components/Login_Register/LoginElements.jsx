import styled from "styled-components";
import {
  AiOutlineMail,
  AiTwotoneEye,
  AiOutlineSend,
  AiTwotoneEyeInvisible,
  AiOutlineUser,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { BiKey } from "react-icons/bi";
export const iconStyles = `

  color: black;
  position: absolute;
  top: 10px;
  z-index:12;
  margin-right:10px;
  left: 10px;
  display: block;
  background: #d1d1d1;
`;
export const Page = styled.div`
  margin-top: 124px;
  display: flex;
`;
export const SideImageDiv = styled.div`
  width: 50%;
`;
export const LoginDiv = styled.div`
  display: grid;
  place-items: center;
  width: 50%;
`;
export const LoginImage = styled.img`
  width: 100%;
`;
export const FormDiv = styled.div`
  width: 400px;
  display: flex;
  ${({ formType }) => (formType === true ? `height:350px` : `height:400px`)};
  height: 500px;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
`;
export const FormInput = styled.input`
  display: block;
  width: 100%;
  height: 45px;
  font-family: "Noto Sans JP", sans-serif;
  color: #000;
  text-indent: 36px;
  border-radius: 24px;
  padding: 4px;
  outline: none;
  border: none;
  background-color: #d1d1d1;
  font-size: 18px;
`;
export const RightArrowIcon = styled(AiOutlineArrowRight)`
  ${iconStyles};
`;
export const FormTitle = styled.h1`
  font-family: "Acme", sans-serif;
  font-style: bold;
`;
export const EmailIcon = styled(AiOutlineMail)`
  ${iconStyles}
`;
export const PasswordIcon = styled(BiKey)`
  ${iconStyles}
`;
export const ShowPasswordIcon = styled(AiTwotoneEye)`
  ${iconStyles};
  right: -10px;
`;
export const HidePasswordIcon = styled(AiTwotoneEyeInvisible)`
  ${iconStyles}
  right:-20px;
`;
export const SubmitDetailsIcon = styled(AiOutlineSend)`
  position: absolute;
  top: 12px;
  margin-right: 10px;
  display: block;
  color: #fff;
  right: 30px;
`;
export const UserIcon = styled(AiOutlineUser)`
  ${iconStyles};
`;

export const InputContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  right: -10px;
`;
export const Button = styled.button`
  border: 4px solid orange;
  height: 45px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  color: orange;
  width: 200px;
  margin-bottom: 10px;
  cursor: pointer;
  display: flex;
  font-weight: 700;
  position: relative;
  font-family: "Raleway", sans-serif;
  font-size: 21px;
  transition: 0.4s linear;
  &::before {
    content: "";
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: #000;
    z-index: -1;
    transition: transform 0.5s;
    transform-origin: 0 0;
    transition-timing-function: cubic-bezier(0.5, 1.64, 0.44, 0.71);
    transform: scaleX(0);
  }
  &:hover {
    color: #fff;
    background-color: orange;
  }
  &:hover::before {
    transform: scaleX(1);
  }
`;
export const TextElement = styled.p`
  font-size: 16px;
  font-family: "Raleway", sans-serif;
  color: black;
`;
export const IElement = styled.i`
  font-style: bolder;
  font-family: "Raleway", sans-serif;
  text-transform: uppercase;
  cursor: pointer;
`;
export const ErrorText = styled.p`
  font-size: 16px;
  text-align: left;
  margin: 5px 10px;
  width: 300px;
  align-self: flex-start;
  font-family: "Raleway", sans-serif;
  color: red;
`;
