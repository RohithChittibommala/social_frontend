import React, { useState } from "react";
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
  SubmitDetailsIcon,
  TextElement,
  UserIcon,
} from "./LoginElements";
import loginImageurl from "./assets/login.svg";
import { toast, ToastContainer } from "react-toastify";
import { toastEmmiterOptions } from "../../configs/toastSettings";
import Toast from "../Toasts/Toast.jsx";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const history = useHistory();
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
      console.log(data);
      if (data.password)
        setErrors((prevState) => ({ ...prevState, password: data.password }));
      else if (data.userExist)
        setErrors((prevState) => ({ ...prevState, email: data.userExist }));
      else {
        localStorage.setItem("jwt", data.token);
        history.push("/");
      }
    } catch (error) {
      toast.error(`error occured ${error}`, toastEmmiterOptions);
      console.error(error);
    }
  };
  console.log(errors);
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
