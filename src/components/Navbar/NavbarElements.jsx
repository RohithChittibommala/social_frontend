import styled, { css } from "styled-components";
import { NavLink as Link } from "react-router-dom";
import fonts from "../../utils/fonts";
const transitionEffect = css`
  transition: all 0.3s ease-in-out;
`;

export const Logo = styled.h1`
  font-family: "Grand Hotel", cursive;
`;
export const Nav = styled.nav`
  background: #fff;
  height: 70px;
  display: flex;
  justify-content: space-between;
  width: 100vw;
  padding: 0.5rem calc((100vw-1000) / 2);
  z-index: 5;
  over-flow: hidden;
  border-bottom: 1px solid lightgray;
`;
export const NavLink = styled(Link)`
  color: #333;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;
  ${fonts.ralewayFont};
  font-size: 20px;
  text-transform: capitalize;
  padding: 0 1rem;
  margin-right: 24px;
  height: 100%;
  font-weight: bold;
  ${transitionEffect};
  &:hover {
    color: orange;
    transform: translateY(-10px);
  }
`;
export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;
export const NavButton = styled.button`
  padding: 6px;
  background-color: royalblue;
  outline: none;
  text-transform: capitalize;
  border: none;
  border-radius: 25px;
  ${transitionEffect};
  margin-right: 12px;
  color: #fff;
  cursor: pointer;
  width: 120px;
  text-align: center;
  font-family: "Grand Hotel", cursive;
  font-size: 26px;

  &:hover {
    background-color: rgb(67, 164, 196);
  }
`;
