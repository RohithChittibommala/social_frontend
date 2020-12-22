import React from "react";
import {
  Nav,
  NavLink,
  NavMenu,
  NavButton,
  NavButtonLink,
  Logo,
} from "./NavbarElements";
function Navbar() {
  return (
    <>
      <Nav>
        <NavLink to="/" activeStyle={{ color: "black" }}>
          <Logo>Social Network</Logo>
        </NavLink>
        <NavMenu>
          <NavLink to="/profile" activeStyle={{ color: "lightgreen" }}>
            profile
          </NavLink>
          <NavLink to="/Home" activeStyle={{ color: "lightgreen" }}>
            Home
          </NavLink>
          <NavButton>
            <NavButtonLink to="/a" activeStyle={{ color: "lightgreen" }}>
              logout
            </NavButtonLink>
          </NavButton>
        </NavMenu>
      </Nav>
    </>
  );
}

export default Navbar;
