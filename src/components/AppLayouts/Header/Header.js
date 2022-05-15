import React from "react";
import { Nav, NavLink, Bars, NavMenu, NavBtnLink } from "./style";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useState, useContext } from "react";
import { useMediaQuery } from "@mui/material";
import UserOption from "./User";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { AuthContext } from "../../../context/AuthContext";
import { CartContext } from "../../../context/CartContext";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 2,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Header = () => {
  const [menu, setMenu] = useState(false);
  const {amount} = useContext(CartContext);
  //const isMobile = useMediaQuery('(min-width:768px)');
  const handleMenu = () => {
    setMenu(!menu);
  };

  const {
    authState: { isAuthenticated, user },
    logoutUser,
  } = useContext(AuthContext);

  return (
    <div>
      <Nav>
        <NavLink to="/">
          <img
            style={{ height: "50px", borderRadius: "10px" }}
            src={require("../../../image/logo.gif")}
            alt="logo"
          />
          <img
            style={{
              height: "65px",
              borderRadius: "10px",
              transform: "scale(0.80)",
              marginLeft: "-30px",
            }}
            src={require("../../../image/logo_final.png")}
            alt="logo"
          />
        </NavLink>
        <Bars onClick={handleMenu} />
        {/* {!isMobile ? <div className={menu ? styles.active : styles.disale}>
          <Link to="/cart" activestyle="true">
            <ShoppingCartOutlinedIcon style={{ marginRight: "5px" }} />
            Giỏ Hàng
          </Link>
          {isAuthenticated && (
            <Link to="/user-profile" activestyle="true">
              {isAuthenticated.username}
            </Link>
          )}
          {!isAuthenticated && (
            <Link to="/sign-up" activestyle="true">
              Đăng Ký
            </Link>
          )}
          {!isAuthenticated && <Link to="/sign-in">Đăng Nhập</Link>}
        </div>: ""} */}
        <NavMenu>
          {isAuthenticated && (
            <NavLink to="/cart" activestyle="true">
              {/* <ShoppingCartOutlinedIcon style={{ marginRight: "5px" }} /> */}
              <IconButton aria-label="cart" style={{ marginRight: "15px" }}>
                <StyledBadge badgeContent={amount} color="secondary">
                  <ShoppingCartOutlinedIcon style={{ color: 'white' }}  />
                </StyledBadge>
              </IconButton>
            </NavLink>
          )}
          {!isAuthenticated && (
            <NavLink to="/sign-up" activestyle="true">
              Đăng Ký
            </NavLink>
          )}
          {!isAuthenticated && <NavBtnLink to="/sign-in">Đăng Nhập</NavBtnLink>}
          {isAuthenticated && (
            <UserOption userName={user.username} Logout={logoutUser} />
          )}
        </NavMenu>
      </Nav>
    </div>
  );
};

export default Header;
