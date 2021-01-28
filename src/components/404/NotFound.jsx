import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Div = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #fafafa;
`;

const NotFound = () => {
  return (
    <Div>
      <h2>This page does not exist</h2>
      <Link to="/">Take me back</Link>
    </Div>
  );
};

export default NotFound;
