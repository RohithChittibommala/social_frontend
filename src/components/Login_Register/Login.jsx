import React, { useState, useContext, useEffect } from "react";
import { Store } from "../state/Store";
import { Link, useHistory } from "react-router-dom";

import {
  Button,
  EmailIcon,
  ErrorText,
  ForgotPasswordModal,
  ForgotPasswordEmailInput,
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
  ForgotPasswordSubmitButton,
  ForgotEmailInputContainer,
} from "./LoginElements";
import loginImageurl from "./assets/login.svg";
import { toast } from "react-toastify";
import { toastEmmiterOptions } from "../../utils/toastSettings";
import { userLoggedIn } from "../state/actionCreators";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const [state, dispatch] = useContext(Store);
  console.log(state);
  useEffect(() => {
    localStorage.clear();
  }, [state]);

  const handleUserLogin = async () => {
    try {
      const responseJSON = await fetch(
        `${process.env.REACT_APP_API_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await responseJSON.json();

      if (data.password)
        setErrors((prevState) => ({ ...prevState, password: data.password }));
      else if (data.userExist)
        setErrors((prevState) => ({ ...prevState, email: data.userExist }));
      else if (data.user) {
        console.log("this is called");

        if (!data.user.isVerified) {
          toast.error(
            "Please click the link that is send to your email address",
            toastEmmiterOptions
          );
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          history.push("/");
          dispatch(userLoggedIn(data.user));
        }
      }
    } catch (error) {
      toast.error(`error occured ${error}`, toastEmmiterOptions);
      console.error(error);
    }
  };

  const handleForgotPassword = () => {
    setForgotEmail("");
    fetch(`${process.env.REACT_APP_API_URL}/forgot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: forgotEmail }),
    })
      .then((res) => {
        res.json().then((res) => toast.info(res.msg, toastEmmiterOptions));
      })
      .catch((err) => toast.error(err, toastEmmiterOptions));
  };

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
            <TextElement color="blue" onClick={() => setIsModalOpen(true)}>
              Forgot Password
            </TextElement>
            <TextElement>
              New user? create account
              <IElement>
                <Link to={"/register"}>here</Link>
              </IElement>
            </TextElement>
          </InputContainer>
        </FormDiv>
        <ForgotPasswordModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          style={{
            overlay: {
              backgroundColor: "rgba(63, 59, 59, 0.75)",
            },
          }}
        >
          <p style={{ fontSize: 18, margin: 10 }}>Enter your Email Address</p>
          <ForgotEmailInputContainer>
            <ForgotPasswordEmailInput
              value={forgotEmail}
              onChange={({ target }) => setForgotEmail(target.value)}
            />
            {forgotEmail.length > 0 && (
              <ForgotPasswordSubmitButton onClick={handleForgotPassword}>
                Submit
              </ForgotPasswordSubmitButton>
            )}
          </ForgotEmailInputContainer>
        </ForgotPasswordModal>
      </LoginDiv>
    </Page>
  );
}

export default Login;
