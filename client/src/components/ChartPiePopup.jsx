import React from "react";
import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartPiePopup = ({ open, onClose, notes }) => {
  if (!notes || notes.length === 0) return null;

  const pieData = {
    labels: notes.map(note => note.name), // Tên ghi chú
    datasets: [
      {
        label: "Chi tiết tài chính",
        data: notes.map(note => note.detailFinancial || 0), // Lấy dữ liệu financial, nếu không có thì mặc định 0
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontSize: "1.5rem", fontWeight: "bold", textAlign: "center" }}>
        Biểu Đồ Chi Tiêu Theo Ghi Chú
      </DialogTitle>
      <DialogContent>
        <Pie data={pieData} />
        <Button onClick={onClose} variant="contained" color="primary" fullWidth sx={{ mt: 2, fontSize: "1.1rem" }}>
          Đóng
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ChartPiePopup;
