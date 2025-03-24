import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Avatar, Box, Menu, MenuItem, Typography } from "@mui/material";

const UserMenu = () => {
  const { user } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  // Kiểm tra nếu user chưa có dữ liệu
  if (!user) {
    return <Typography>WTF!? I don't have your data... </Typography>;
  }
  const handleLogout = () => {
    const auth = user.auth;
    auth.signOut();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center" }} onClick={handleClick}>
        <Typography>{user.displayName}</Typography>
        <Avatar
          alt="avatar"
          src={user.photoURL}
          sx={{ width: 24, height: 24, marginLeft: "5px" }}
        />
      </Box>
      <Menu
        id="Basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
