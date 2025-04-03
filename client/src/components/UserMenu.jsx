import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Menu, MenuItem, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
const UserMenu = () => {
  const { user } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate()
  const open = Boolean(anchorEl);
  const [openDialog, setOpenDialog] = useState(false);
  // Kiểm tra nếu user chưa có dữ liệu
  if (!user) {
    return <Typography>WTF!? I don't have your data... </Typography>;
  }
  const handleLogout = () => {
    user.auth.signOut();
    handleClose();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleHome = () => {
    navigate('/');
    handleClose();
  };
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleOpenDialog = () => {
        handleClose();
        setOpenDialog(true);

  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
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
  onClose={handleClose} // Đảm bảo menu đóng đúng cách
>
  <MenuItem onClick={handleHome}>Trang Chủ</MenuItem>
  <MenuItem onClick={handleOpenDialog}>Thông Tin Của Tôi</MenuItem>
  <MenuItem onClick={handleLogout}>Logout</MenuItem>
</Menu>


      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Thông Tin Của Tôi</DialogTitle>
        <DialogContent>
          <Avatar
            alt="avatar"
            src={user.photoURL}
            sx={{ width: 30, height: 30, display: 'flex' ,flexDirection: "column", alignItems: "center", textAlign: "center"}}
          />
          <Typography><strong>Tên:</strong> {user.displayName}</Typography>
          <Typography><strong>Email:</strong> {user.email}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserMenu;
