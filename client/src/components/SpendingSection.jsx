import { NoteAddOutlined, DeleteOutline, PieChartOutlined } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  List,
  Tooltip,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useParams, useLoaderData, useSubmit, useNavigate } from "react-router-dom";
import ChartPiePopup from "./ChartPiePopup"; // Import biểu đồ tròn

const SpendingSection = () => {
  const { noteId, folderId } = useParams();
  const [activeNoteId, setActiveNoteId] = useState(noteId);
  const { folder } = useLoaderData() || {};
  const submit = useSubmit();
  const navigate = useNavigate();

  // 🔹 State quản lý popup biểu đồ tròn
  const [openPiePopup, setopenPiePopup] = useState(false); 

  // 🔹 State quản lý popup ghi chú
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(""); // Tên ghi chú
  const [content, setContent] = useState(""); // Nội dung ghi chú
  const [detailFinancial, setDetailFinancial] = useState(0); // Chi tiết tài chính

  useEffect(() => {
    if (noteId) {
      setActiveNoteId(noteId);
      return;
    }
    if (folder?.notes?.[0]) {
      navigate(`note/${folder.notes[0].id}`);
    }
  }, [noteId, folder.notes]);

  // Mở popup biểu đồ tròn
  const handleopenPiePopup = () => setopenPiePopup(true);
  const handleCloseChartPopup = () => setopenPiePopup(false);

  // Mở popup ghi chú
  const handleOpenPopup = () => setOpen(true);
  const handleClosePopup = () => {
    setName("");
    setContent("");
    setDetailFinancial(0);
    setOpen(false);
  };

  // Gửi dữ liệu khi nhấn "Tạo Ghi Chú"
  const handleSubmitNewNote = () => {
    if (!name.trim()) return alert("Vui lòng nhập tên ghi chú!");
    if (!content.trim()) return alert("Vui lòng nhập nội dung!");

    submit(
      {
        name, // Tên ghi chú (đã đổi từ title thành name)
        content, // Nội dung
        folderId,
        detailFinancial: Number(detailFinancial) || 0, // Đảm bảo luôn là số
      },
      { method: "POST", action: `/folders/${folderId}` }
    );
    handleClosePopup();
  };

  // Xóa ghi chú
  const handleDeleteNote = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa ghi chú này?")) {
      submit(null, { method: "POST", action: `/folders/${folderId}/note/${id}/delete` });
      if (id === activeNoteId) {
        setActiveNoteId(null);
        navigate(`/folders/${folderId}`);
      }
    }
  };

  return (
    <>
      <Grid container height="100%">
        <Grid
          item
          xs={4}
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "#F0EBE3",
            height: "100%",
            overflowY: "auto",
            padding: "10px",
            textAlign: "left",
          }}
        >
          <List
            subheader={
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography sx={{ fontWeight: "bold" }}>Các Mục Chi Tiêu</Typography>
                <Tooltip title="Add Note">
                  <IconButton size="small" onClick={handleOpenPopup}>
                    <NoteAddOutlined />
                  </IconButton>
                </Tooltip>
                <Tooltip title="View Chart">
                  <IconButton size="small" onClick={handleopenPiePopup}>
                    <PieChartOutlined /> {/* Thay thế biểu tượng */}
                  </IconButton>
                </Tooltip>
              </Box>
            }
          >
            {folder?.notes?.map(({ id, name }) => (
              <Box key={id} display="flex" alignItems="center" justifyContent="space-between">
                <Link
                  to={`note/${id}`}
                  style={{ textDecoration: "none", flexGrow: 1 }}
                  onClick={() => setActiveNoteId(id)}
                >
                  <Card
                    sx={{
                      mb: "5px",
                      backgroundColor: id === activeNoteId ? "rgb(255 211 140)" : null,
                    }}
                  >
                    <CardContent sx={{ "&:last-child": { pb: "10px" }, padding: "10px" }}>
                      <Typography sx={{ fontSize: 14, fontWeight: "bold" }}>
                        {name || "Untitled"}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
                <IconButton size="small" onClick={() => handleDeleteNote(id)}>
                  <DeleteOutline color="error" />
                </IconButton>
              </Box>
            ))}
          </List>
        </Grid>
        <Grid item xs={8}>
          <Outlet />
        </Grid>
      </Grid>

      {/* 🔹 Dialog Popup */}
      <Dialog open={open} onClose={handleClosePopup}>
        <DialogTitle>Tạo Ghi Chú Mới</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Tên ghi chú"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Nội dung"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Chi tiết tài chính"
            fullWidth
            variant="outlined"
            type="number"
            value={detailFinancial}
            onChange={(e) => setDetailFinancial(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopup}>Hủy</Button>
          <Button onClick={handleSubmitNewNote} variant="contained">
            Tạo Ghi Chú
          </Button>
        </DialogActions>
      </Dialog>

      {/* 🔹 Biểu đồ tròn Popup */}
      <ChartPiePopup open={openPiePopup} onClose={handleCloseChartPopup} notes={folder?.notes} />
    </>
  );
};

export default SpendingSection;
