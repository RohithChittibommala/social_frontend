import styled, { css } from "styled-components";
import { NavLink as Link } from "react-router-dom";
import fonts from "../../configs/fonts";
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
  ${transitionEffect};
  &.active {
    color: #15cdfc;
  }
  &:hover {
    color: rgb(24, 218, 105);
  }
`;
export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;
export const NavButton = styled.button`
  padding: 6px 15px;
  background-color: royalblue;
  outline: none;
  height: 50px;
  text-transform: capitalize;
  align-items: center;
  display: flex;
  border: none;
  border-radius: 25px;
  ${transitionEffect};
  margin-right: 16px;
  font-size: 16px;
  &:hover {
    background-color: rgb(67, 164, 196);
  }
`;
export const NavButtonLink = styled(Link)`
  color: #fff;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  font-family: "Grand Hotel", cursive;
  font-size: 26px;
  ${transitionEffect};
  align-items: center;
  padding: 0 1rem;
  height: 100%;
`;
