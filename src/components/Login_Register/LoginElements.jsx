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
  width: 300px;
  display: flex;
  ${({ formType }) => (formType === true ? `height:350px` : `height:400px`)};
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
export const Button = styled.div`
  ${({ backgroundColor }) =>
    backgroundColor ? `background:#ee9090` : `background:#528eb1`};
  height: 45px;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  color: #fff;
  width: 200px;
  cursor: pointer;
  margin-bottom: 10px;
  display: flex;
  poaition: relative;
  font-family: "Raleway", sans-serif;
  font-size: 21px;
  &:hover {
    background-color: orange;
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
  font-family: "Raleway", sans-serif;
  color: red;
`;
