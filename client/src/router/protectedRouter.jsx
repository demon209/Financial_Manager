import React from "react";
import { Outlet, useNavigate, Navigate } from "react-router-dom";

export default function ProtectedRouter(children) {
  const navigate = useNavigate();
  if (!localStorage.getItem("accessToken")) {
    return <Navigate to= '/login' />
  }

  return <Outlet />;
}
