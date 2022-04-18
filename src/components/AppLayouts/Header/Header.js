import React from "react";
import { Nav, NavLink, Bars, NavMenu, NavBtnLink } from "./style";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import styles from './Header.module.css';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import { useMediaQuery } from "@mui/material";

import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const Header = () => {
  const [menu, setMenu] = useState(false)  
  const isMobile = useMediaQuery('(min-width:768px)');

  const handleMenu = ()=>{
    setMenu(!menu);
  }

  const {authState, logout} = useContext(AuthContext)
  const user = authState.user
  return (
    <div style={{position: "fixed", zIndex: 10000, width: "100%"}}>
      <Nav>
        <NavLink to="/">
          <img
            style={{ height: "50px", borderRadius: "10px" }}
            src={require("../../../image/logo.gif")}
            alt="logo"
          />
          <img
            style={{
              height: "50px",
              borderRadius: "10px",
              transform: "scale(0.80)",
              marginLeft: "-17px",
            }}
            src={require("../../../image/logo1.png")}
            alt="logo"
          />
        </NavLink>
        <Bars onClick={handleMenu} />
        {!isMobile ? <div className={menu ? styles.active : styles.disale}>
          <Link to="/cart" activestyle="true">
            <ShoppingCartOutlinedIcon style={{ marginRight: "5px" }} />
            Giỏ Hàng
          </Link>
          {user && (
            <Link to="/user-profile" activestyle="true">
              {user.username}
            </Link>
          )}
          {!user && (
            <Link to="/sign-up" activestyle="true">
              Đăng Ký
            </Link>
          )}
          {!user && <Link to="/sign-in">Đăng Nhập</Link>}
        </div>: ""}
        <NavMenu >
          <NavLink to="/cart" activestyle="true">
            <ShoppingCartOutlinedIcon style={{ marginRight: "5px" }} />
            Giỏ Hàng
          </NavLink>
          {user && (
            <NavLink to="/user-profile" activestyle="true">
              {user.username}
            </NavLink>
          )}
          {!user && (
            <NavLink to="/sign-up" activestyle="true">
              Đăng Ký
            </NavLink>
          )}
          {!user && <NavBtnLink to="/sign-in">Đăng Nhập</NavBtnLink>}
          {user && <NavBtnLink to="/" onClick={logout}>Đăng xuất</NavBtnLink>}
        </NavMenu>
      </Nav>
    </div>
  );
};

export default Header;
