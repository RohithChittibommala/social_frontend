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
  ErrorText,
} from "./LoginElements";
import registerImageurl from "./assets/register.svg";
import { Link, useHistory } from "react-router-dom";
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, SetShowPassword] = useState(false);
  const [errors, SetErrors] = useState({});
  const history = useHistory();
  const handleUserRegister = async () => {
    try {
      const responseJSON = await fetch("http://localhost:4000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await responseJSON.json();
      if (data.errors) populateErrorMessages(data.errors);
      else if (data.userExist)
        SetErrors((prevState) => ({ ...prevState, email: data.userExist }));
      else history.push("/login");
    } catch (error) {
      console.error(error);
    }
  };
  const populateErrorMessages = (registerErrors) => {
    registerErrors.forEach(({ param, msg }) => {
      console.log(msg, param);
      SetErrors((prevState) => ({
        ...prevState,
        [param]: msg,
      }));
    });
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
            <ErrorText>{errors.name}</ErrorText>
          </InputContainer>

          <InputContainer>
            <EmailIcon size="24px" />
            <FormInput
              placeholder="Enter your email"
              value={email}
              type="email"
              autoComplete="false"
              onChange={({ target }) => setEmail(target.value)}
            />
            <ErrorText>{errors.email}</ErrorText>
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
            <ErrorText>{errors.password}</ErrorText>
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
              Register
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
