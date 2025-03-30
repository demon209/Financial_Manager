import React from "react";
import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartMonthPopup = ({ open, onClose, folders }) => {
  if (!folders || folders.length === 0) return null;


const sortedFolders = [...folders]
const barData = {
  labels: sortedFolders.map(folder => folder.name), // Tên tháng đã sắp xếp
  datasets: [
    {
      label: "Chi tiêu hàng tháng",
      data: sortedFolders.map(folder => folder.financial), // Dữ liệu từ financial
      backgroundColor: "#42A5F5",
    },
  ],
};
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg" // Mở rộng kích thước tối đa
      fullWidth
      PaperProps={{
        sx: {
          minWidth: "80vw", // Tăng chiều rộng
          minHeight: "70vh", // Tăng chiều cao
          padding: 2, // Thêm khoảng cách
        },
      }}
    >
      <DialogTitle sx={{ fontSize: "1.5rem", fontWeight: "bold", textAlign: "center" }}>
        Biểu Đồ Chi Tiêu Hàng Tháng
      </DialogTitle>
      <DialogContent>
        <Bar data={barData} />
        <Button onClick={onClose} variant="contained" color="primary" fullWidth sx={{ mt: 2, fontSize: "1.1rem" }}>
          Đóng
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ChartMonthPopup;
