import React, { useContext, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate, Navigate } from "react-router-dom";
import { graphQLServer } from "../ultils/constants";
import { graphQLrequest } from "../ultils/request";

const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    const {user: {uid, displayName}} = await signInWithPopup(auth, provider);


    const {data} = await graphQLrequest({query: `mutation register($uid: String!, $name: String!) {
      register(uid: $uid, name: $name){
        uid
        name
      }
      }`, variables: {
        uid,
        name: displayName
      }
    })
      console.log("register", {data})
  };
  if (localStorage.getItem('accessToken')) {
    return <Navigate to="/" /> 
  }
  return (
    <>
      <Typography variant="h3" sx={{ marginBottom: "10px" }}>
        Welcome to Financial Manager App
      </Typography>
      <Typography variant="h5" sx={{ marginBottom: "10px" }}>
        The app was developed by VuAnhQuan.{" "}
      </Typography>
      <Typography variant="h7" sx={{ marginBottom: "10px", color: "red" }}>
        Don't be afraid because your email is still managed by Google. I have no
        data when you log in.
      </Typography>
      <Box sx={{ marginTop: "20px" }}>
        <Button variant="outlined" onClick={handleLoginWithGoogle}>
          Login with Google
        </Button>
      </Box>
    </>
  );
};

export default Login;
