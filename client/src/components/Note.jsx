import { Alert, Box, debounce, Snackbar } from "@mui/material";
import {
  ContentState,
  convertFromHTML,
  convertToRaw,
  EditorState,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import React, { useEffect, useMemo, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useLoaderData, useLocation, useSubmit } from "react-router-dom";

// 🔹 Hàm tách số tiền từ nội dung content (tìm số trong chuỗi)
const extractAmountFromContent = (content) => {
  // 🔹 Tìm các số tiền có dạng: 1.000.000 hoặc 1,000,000
  const matches = content.match(/(\d{1,3}([.,]\d{3})+)/g) || content.match(/\d+/g);
  if (!matches) return 0; // Không tìm thấy số, trả về 0

  return matches
    .map(num => Number(num.replace(/[.,]/g, ""))) // Xóa dấu `.` và `,` rồi chuyển thành số
    .filter(num => num > 5000) // Loại bỏ số nhỏ hơn 5000 VNĐ (tránh lấy ngày)
    .reduce((sum, num) => sum + num, 0); // Cộng tổng
};


const Note = () => {
  const { note } = useLoaderData();
  const submit = useSubmit();
  const location = useLocation();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [rawHTML, setRawHTML] = useState(note.content);
  const [totalAmount, setTotalAmount] = useState(extractAmountFromContent(note.content)); // Tổng số tiền trong content
  const [remainingAmount, setRemainingAmount] = useState((note.detailFinancial || 0) - totalAmount); // ✅ Đổi dấu
  const [openSnackbar, setOpenSnackbar] = useState(false); // Để điều khiển việc hiển thị thông báo lưu thành công

  useEffect(() => {
    const blocksFromHTML = convertFromHTML(note.content);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    setEditorState(EditorState.createWithContent(state));
    setTotalAmount(extractAmountFromContent(note.content)); // Cập nhật số tiền khi note thay đổi
    setRemainingAmount((note.detailFinancial || 0) - totalAmount); // ✅ Cập nhật số tiền còn lại
  }, [note.id, note.content, note.detailFinancial]);

  useEffect(() => {
    debounceMemorized(rawHTML, note, location.pathname);
  }, [rawHTML, location.pathname]);

  const debounceMemorized = useMemo(() => {
    return debounce((rawHTML, note, pathname) => {
      if (rawHTML === note.content) return;
      submit(
        { ...note, content: rawHTML },
        {
          method: "post",
          action: pathname,
        }
      );

      // Mở Snackbar thông báo khi lưu thành công
      setOpenSnackbar(true);

      // Tự động đóng Snackbar sau 3 giây
      setTimeout(() => {
        setOpenSnackbar(false);
      }, 3000);
    }, 5000); // Lưu sau 10 giây
  }, []);

  useEffect(() => {
    setRawHTML(note.content);
  }, [note.content]);

  const handleChange = (newEditorState) => {
    setEditorState(newEditorState);
    const contentState = newEditorState.getCurrentContent();
    const newHTML = draftToHtml(convertToRaw(contentState));
    setRawHTML(newHTML);

    // 🔹 Tính toán lại số tiền khi content thay đổi
    const extractedAmount = extractAmountFromContent(newHTML);
    setTotalAmount(extractedAmount);
    setRemainingAmount((note.detailFinancial || 0) - extractedAmount); // ✅ Sửa lại phép tính
  };

  return (
    <div>
      <Editor
        editorState={editorState}
        onEditorStateChange={handleChange}
        placeholder="Nhập nội dung và đợi hệ thống lưu sau 5s. Số tiền cần ghi đúng định dạng: 15.000.000 VNĐ."
      />
      <Box sx={{ textAlign: "right", fontSize: "12px", color: "gray", mt: 1 }}>
        <p><strong>Số tiền thực tế:</strong> {totalAmount.toLocaleString()} VNĐ</p>
        <p><strong>Số tiền ban đầu:</strong> {note.detailFinancial?.toLocaleString() || 0} VNĐ</p>
        <p><strong>Số tiền còn lại:</strong> {remainingAmount.toLocaleString()} VNĐ</p>
      </Box>

      {/* Snackbar thông báo đã lưu */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000} // Ẩn sau 3 giây
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Nội dung đã được lưu thành công!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Note;
