import React from "react";
import { Nav, NavLink, Bars, NavMenu, NavBtnLink } from "./style";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
const Header = () => {
  const user = false;
  return (
    
    <>
      <Nav>
        <NavLink to="/">
          <img
            style={{ height: "50px" }}
            src={require("../../image/logo.png")}
            alt="logo"
          />
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to="/cart" activestyle="true">
            <ShoppingCartOutlinedIcon/>Giỏ hàng
          </NavLink>
          {user && <NavLink to="/user-profile" activestyle="true">
            Vua Lì đòn
          </NavLink>}
          {!user && <NavLink to="/sign-up" activestyle="true">
            Sign Up
          </NavLink>}
          {!user && <NavBtnLink to="/sign-in">Sign In</NavBtnLink>}
        </NavMenu>
      </Nav>
    </>
  );
};

export default Header;
