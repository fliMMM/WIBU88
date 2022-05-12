import React from "react";
import IconButton from "@mui/material/IconButton";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import Tooltip from "@mui/material/Tooltip";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import Logout from "@mui/icons-material/Logout";
import {
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Avatar,
} from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Link } from "react-router-dom";

export default function UserOption({ userName }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { logoutUser } = useContext(AuthContext);
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <Avatar /> {userName}
        </MenuItem>
        <Divider />
        <Link
          to="orderHistory"
          style={{ textDecoration: "none", color: "#4A4A4A" }}
        >
          <MenuItem>
            <ListItemIcon>
              <LocalMallOutlinedIcon fontSize="small"/>
            </ListItemIcon>
            Lịch sử mua hàng
          </MenuItem>
        </Link>
        <Link
          to="readOnline"
          style={{ textDecoration: "none", color: "#4A4A4A" }}
        >
          <MenuItem>
            <ListItemIcon>
              <LocalMallOutlinedIcon fontSize="small"/>
            </ListItemIcon>
            Đọc trực tuyến
          </MenuItem>
        </Link>
        <MenuItem onClick={logoutUser}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Đăng xuất
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
