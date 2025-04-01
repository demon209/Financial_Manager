import React from "react";
import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartMonthPopup = ({ open, onClose, folders }) => {
  if (!folders || folders.length === 0) return null;
  // 🔹 Sắp xếp folders theo `createdAt` từ mới đến cũ
  const sortedFolders = [...folders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // 🔹 Chỉ lấy 12 tháng gần nhất
  const recent12Months = sortedFolders.slice(0, 12).reverse(); // Đảo ngược để tháng cũ hiển thị trước

  const barData = {
    labels: recent12Months.map(folder => folder.name), // Tên tháng
    datasets: [
      {
        label: "Ngân sách tháng",
        data: recent12Months.map(folder => folder.financial || 0),
        backgroundColor: "#42A5F5",
      },
      {
        label: "Đã chi tiêu",
        data: recent12Months.map(folder =>
          folder.notes?.reduce((sum, note) => sum + (note.detailFinancial || 0), 0) || 0
        ),
        backgroundColor: "#FF7043",
      },
    ],
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          minWidth: "80vw",
          minHeight: "70vh",
          padding: 2,
        },
      }}
    >
      <DialogTitle sx={{ fontSize: "1.5rem", fontWeight: "bold", textAlign: "center" }}>
        Biểu Đồ Chi Tiêu Hàng Tháng (12 tháng gần nhất)
      </DialogTitle>
      <DialogContent>
        <Bar data={barData} />
        <Button
          onClick={onClose}
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2, fontSize: "1.1rem" }}
        >
          Đóng
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ChartMonthPopup;
