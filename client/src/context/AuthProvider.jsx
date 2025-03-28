import { CircularProgress } from "@mui/material";
import { getAuth, onIdTokenChanged } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);  // ✅ Fix useState
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      if (user) {
        const accessToken = await user.getIdToken();  // ✅ Lấy token đúng cách
        setUser(user);
        
        // Nếu token thay đổi → Cập nhật localStorage & reload
        if (accessToken !== localStorage.getItem("accessToken")) {
          localStorage.setItem("accessToken", accessToken);
          window.location.reload();
        }

        setIsLoading(false);
        return;
      }

      // Khi không có user → Reset trạng thái
      setIsLoading(false);
      setUser(null);
      localStorage.clear();
      navigate("/login");
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {isLoading ? <CircularProgress /> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
