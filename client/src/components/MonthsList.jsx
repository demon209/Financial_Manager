import { Box, Button, Card, CardContent, List, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ChartMonthPopup from "./ChartMonthPopup"; // Import Popup
import NewMonth from "./NewMonth";

const MonthsList = ({ folders = [] }) => {
  const { folderId } = useParams();
  const [activeFolderId, setActiveFolderId] = useState(folderId);
  const [openChart, setOpenChart] = useState(false); // Trạng thái mở popup
  const currentYear = new Date().getFullYear();
  return (
    <>
      <List sx={{ width: "100%", bgcolor: "#7D9D9C", height: "100%", padding: "10px", textAlign: "left", overflowY: "auto" }}
        subheader={
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography sx={{ fontWeight: "bold", color: "white" }}>Danh Sách Tháng</Typography>
            <Typography sx={{ fontWeight: "bold", color: "white" }}>{currentYear}</Typography>
            <NewMonth />
          </Box>
        }
      >
        {folders.map(({ id, name }) => (
          <Link key={id} to={`folders/${id}`} style={{ textDecoration: "none" }} onClick={() => setActiveFolderId(id)}>
            <Card sx={{ mb: "5px", backgroundColor: id === activeFolderId ? "rgb(255 211 140)" : null }}>
              <CardContent sx={{ "&:last-child": { pb: "10px" }, padding: "10px" }}>
                <Typography>{name}</Typography>
              </CardContent>
            </Card>
          </Link>
        ))}
      </List>

      {/* Nút mở biểu đồ */}
      <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={() => setOpenChart(true)}>
        Xem Biểu Đồ
      </Button>

      {/* Popup Biểu Đồ */}
      <ChartMonthPopup open={openChart} onClose={() => setOpenChart(false)} folders={folders} />
    </>
  );
};

export default MonthsList;
