import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router/index";
import './firebase/config';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'


import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Container } from "@mui/system";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Container maxWidth='lg' sx={{ textAlign: 'center', marginTop: '50px'}} >
      <RouterProvider router={router} />
    </Container>
);
