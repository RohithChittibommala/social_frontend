import React, { useState } from "react";
import {
  Button,
  EmailIcon,
  FormDiv,
  FormInput,
  FormTitle,
  IElement,
  InputEnclosingDiv,
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
import registerImageurl from "./assets/register.svg";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  // const [showingPassword, setShowingPassword] = useState(false);

  const renderLoginButton = () => (
    <Button backgroundColor={isLoginForm} onClick={handleUserLogin}>
      Login <SubmitDetailsIcon size="24px" />
    </Button>
  );
  const renderRegisterButton = () => (
    <Button backgroundColor={isLoginForm} onClick={handleUserRegister}>
      Register <SubmitDetailsIcon size="24px" />
    </Button>
  );
  const handleUserLogin = () => {};
  const handleUserRegister = () => {};
  return (
    <Page>
      <SideImageDiv>
        <LoginImage src={isLoginForm ? loginImageurl : registerImageurl} />
      </SideImageDiv>
      <LoginDiv>
        <FormDiv formType={isLoginForm}>
          <FormTitle>{isLoginForm ? "Login" : "Register"}</FormTitle>
          {!isLoginForm && (
            <InputEnclosingDiv>
              <UserIcon size="24px" />
              <FormInput
                placeholder="Enter your name"
                value={name}
                onChange={({ target }) => setName(target.value)}
              />
            </InputEnclosingDiv>
          )}
          <InputEnclosingDiv>
            <EmailIcon size="24px" />
            <FormInput
              placeholder="Enter your email"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />
          </InputEnclosingDiv>
          <InputEnclosingDiv>
            <PasswordIcon size="24px" />
            <FormInput
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </InputEnclosingDiv>
          <InputEnclosingDiv>
            {isLoginForm ? renderLoginButton() : renderRegisterButton()}
            {isLoginForm ? (
              <TextElement>
                New user? create account{" "}
                <IElement onClick={() => setIsLoginForm((prev) => !prev)}>
                  here
                </IElement>
              </TextElement>
            ) : (
              <TextElement>
                Already have an account login{" "}
                <IElement onClick={() => setIsLoginForm((prev) => !prev)}>
                  here
                </IElement>
              </TextElement>
            )}
          </InputEnclosingDiv>
        </FormDiv>
      </LoginDiv>
    </Page>
  );
}

export default Login;
