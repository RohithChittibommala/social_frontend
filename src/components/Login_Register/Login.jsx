import React, { useState, useContext } from "react";
import { Store } from "../state/Store";
import { Link, useHistory } from "react-router-dom";

import {
  Button,
  EmailIcon,
  ErrorText,
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
  TextElement,
} from "./LoginElements";
import loginImageurl from "./assets/login.svg";
import { toast } from "react-toastify";
import { toastEmmiterOptions } from "../../utils/toastSettings";
import Toast from "../Toasts/Toast.jsx";
import { userLoggedIn } from "../state/actionTypes";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const [state, dispatch] = useContext(Store);
  const handleUserLogin = async () => {
    try {
      const responseJSON = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await responseJSON.json();

      if (data.password)
        setErrors((prevState) => ({ ...prevState, password: data.password }));
      else if (data.userExist)
        setErrors((prevState) => ({ ...prevState, email: data.userExist }));
      else if (data.user) {
        localStorage.setItem("jwt", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        history.push("/");
        dispatch(userLoggedIn(data.user));
      }
    } catch (error) {
      toast.error(`error occured ${error}`, toastEmmiterOptions);
      console.error(error);
    }
  };
  return (
    <Page>
      <Toast />
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
            <ErrorText>{errors.email}</ErrorText>
          </InputContainer>
          <InputContainer>
            <PasswordIcon size="24px" />
            <FormInput
              placeholder="Enter your password"
              type={!showPassword ? "password" : "text"}
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <ErrorText>{errors.password}</ErrorText>
          </InputContainer>
          <div className="password-checkbox">
            <input
              type="checkbox"
              onChange={() => setShowPassword((prev) => !prev)}
            />
            <TextElement>show password</TextElement>
          </div>
          <Button onClick={handleUserLogin}>Login</Button>
          <InputContainer>
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
