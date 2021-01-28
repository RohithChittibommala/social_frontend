import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { logoutUser } from "../state/actionCreators";
import { Store } from "../state/Store";
import { Nav, NavLink, NavMenu, NavButton, Logo } from "./NavbarElements";
function Navbar() {
  const history = useHistory();
  const [state, dispatch] = useContext(Store);
  const { isAuthenicated } = state;
  const handleUserLogout = () => {
    localStorage.clear();
    dispatch(logoutUser());
    setTimeout(history.push("/login"), 1000);
  };
  useEffect(() => {}, [isAuthenicated]);
  return (
    <>
      <Nav>
        <NavLink to={isAuthenicated ? "/" : "/login"}>
          <Logo>Social Network</Logo>
        </NavLink>
        <NavMenu>
          <NavLink to="/profile">profile</NavLink>
          <NavLink to={isAuthenicated ? "/createpost" : "/"}>
            Create Post
          </NavLink>
          {isAuthenicated && (
            <NavButton onClick={handleUserLogout}>Logout</NavButton>
          )}
        </NavMenu>
      </Nav>
    </>
  );
}

export default Navbar;
