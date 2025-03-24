import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);
  return (
    <div id="error-page" style={{ textAlign: "center" }}>
      <h1 style={{ fontSize: "50px" }}>Opps!</h1>
      <p style={{ fontSize: "20px", marginTop: "15px" }}>
        Sorry, an unexpected error has occurred.
      </p>
      <p style={{ fontSize: "18px" }}>
        An error name:{" "}
        <i style={{ color: "red" }}>{error.statusText || error.message}</i>
      </p>
      <p style={{ fontSize: "18px" }}>
        <i>😥😥😥😥😥</i>
      </p>
    </div>
  );
};

export default ErrorPage;
