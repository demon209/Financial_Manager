import React from "react";
import { Grid, Grid2, Typography } from "@mui/material";
import { Box } from "@mui/material";
import UserMenu from "../components/UserMenu";
import WeeksList from "../components/MonthsList";
import { Outlet, useLoaderData } from "react-router-dom";

const Home = () => {
  const data = useLoaderData() || {};
  const folders = data.folders || [];

  return (
    <>
      <Typography variant="h4" sx={{ mb: "20px" }}>
        Financial Manager App
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "right", mb: "10px" }}>
        <UserMenu></UserMenu>
      </Box>
      <Grid
        container
        sx={{ height: "50vh", boxShadow: "0 0 15px 0 rgb(193, 193, 193, 0.6)" }}
      >
        <Grid item xs={3} sx={{ height: "100%" }}>
          <WeeksList folders={folders}></WeeksList>
        </Grid>
        <Grid item xs={9} sx={{ height: "100%" }}>
          <Outlet></Outlet>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
