import React, { useState } from "react";
import {
  Button,
  EmailIcon,
  FormDiv,
  FormInput,
  FormTitle,
  IElement,
  InputContainer,
  LoginDiv,
  LoginImage,
  Page,
  PasswordIcon,
  SideImageDiv,
  SubmitDetailsIcon,
  TextElement,
  UserIcon,
} from "./LoginElements";
import registerImageurl from "./assets/register.svg";
import { Link } from "react-router-dom";
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, SetShowPassword] = useState(false);
  const handleUserRegister = () => {
    console.log(name, email, password);
  };
  return (
    <Page>
      <SideImageDiv>
        <LoginImage src={registerImageurl} />
      </SideImageDiv>
      <LoginDiv>
        <FormDiv formType={false}>
          <FormTitle>{"Register"}</FormTitle>
          <InputContainer>
            <UserIcon size="24px" />
            <FormInput
              placeholder="Enter your name"
              autoComplete="false"
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
          </InputContainer>

          <InputContainer>
            <EmailIcon size="24px" />
            <FormInput
              placeholder="Enter your email"
              value={email}
              autoComplete="false"
              onChange={({ target }) => setEmail(target.value)}
            />
          </InputContainer>
          <InputContainer>
            <PasswordIcon size="24px" />
            <FormInput
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              value={password}
              autoComplete="false"
              onChange={({ target }) => setPassword(target.value)}
            />
          </InputContainer>
          <div className="password-checkbox">
            <input
              type="checkbox"
              onChange={() => SetShowPassword((prev) => !prev)}
            />
            <TextElement>show password</TextElement>
          </div>
          <InputContainer>
            <Button backgroundColor={false} onClick={handleUserRegister}>
              Register <SubmitDetailsIcon size="24px" />
            </Button>
            <TextElement>
              Already have an account login
              <Link to="/login">
                <IElement>here</IElement>
              </Link>
            </TextElement>
          </InputContainer>
        </FormDiv>
      </LoginDiv>
    </Page>
  );
}

export default Register;
