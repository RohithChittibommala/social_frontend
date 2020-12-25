import React, { useState } from "react";
import { Link } from "react-router-dom";
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
import loginImageurl from "./assets/login.svg";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, SetShowPassword] = useState(false);
  const [errors, SetErrors] = useState({});
  const handleUserLogin = () => {};
  return (
    <Page>
      <SideImageDiv>
        <LoginImage src={loginImageurl} />
      </SideImageDiv>
      <LoginDiv>
        <FormDiv formType={true}>
          <FormTitle>{"Login"}</FormTitle>

          <InputContainer>
            <EmailIcon size="24px" />
            <FormInput
              placeholder="Enter your email"
              value={email}
              type="email"
              onChange={({ target }) => setEmail(target.value)}
            />
          </InputContainer>
          <InputContainer>
            <PasswordIcon size="24px" />
            <FormInput
              placeholder="Enter your password"
              type={!showPassword ? "password" : "text"}
              value={password}
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
            <Button backgroundColor={true} onClick={handleUserLogin}>
              Login <SubmitDetailsIcon size="24px" />
            </Button>
            <TextElement>
              New user? create account
              <IElement>
                <Link to={"/register"}>here</Link>
              </IElement>
            </TextElement>
          </InputContainer>
        </FormDiv>
      </LoginDiv>
    </Page>
  );
}

export default Login;
