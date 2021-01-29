import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { toastEmmiterOptions } from "../../utils/toastSettings";
import { InputContainer } from "../createpost/CreateElements";

const Div = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #fafafa;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  width: 600px;
  padding: 12px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  height: 300px;
  border-radius: 25px;
  background-color: #fff;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: lighter;
  text-align: center;
`;
const PasswordInput = styled.input`
  display: block;
  text-indent: 25px;
  transition: 0.2s ease-in all;
  height: 30px;
  width: 250px;
  padding: 6px;
  font-size: 18px;
  margin: 15px auto;
`;

const Button = styled.button`
  font-size: 18px;
  width: 150px;
  margin: 20px 120px;
  border-radius: 25px;
  outline: none;
  padding: 6px 12px;
  border: none;
  background-color: ${({ disabled }) => (disabled ? "grey" : "lightblue")};
  cursor: ${({ disabled }) => (disabled ? null : "pointer")};
  color: #fff;
`;
const ResetPassword = () => {
  const history = useHistory();
  const token = useParams();
  console.log(token);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordChange = async () => {
    try {
      const resJSON = await fetch(`${process.env.REACT_APP_API_URL}/reset/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token.id, password }),
      });
      const res = await resJSON.json();
      if (res.error) {
        toast.error(res.error, toastEmmiterOptions);
        history.push("/login");
      } else {
        toast.success(res.msg, toastEmmiterOptions);
        history.push("/");
      }
    } catch (error) {}
  };

  return (
    <Div>
      <Container>
        <Title>Enter your new Password</Title>
        <InputContainer>
          <PasswordInput
            value={password}
            type={showPassword ? "text" : "password"}
            onChange={({ target }) => setPassword(target.value)}
          />
          <div className="password-checkbox">
            <input
              type="checkbox"
              onChange={() => setShowPassword((prev) => !prev)}
            />
            <p>show password</p>
          </div>
          <Button
            onClick={handlePasswordChange}
            disabled={password.length <= 6}
          >
            Reset
          </Button>
        </InputContainer>
      </Container>
    </Div>
  );
};

export default ResetPassword;
