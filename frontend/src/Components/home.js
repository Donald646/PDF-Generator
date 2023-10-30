import React from "react";
import { Link } from "react-router-dom";

//import { Box, CircularProgress } from "@mui/material/";
import homePDF from "./homePDF3.png";

export const Home = () => {
  return (
    <div className="home-page">
      <div className="home-page1">
        <h2>Effortlessly Create Customized Worksheets</h2>
        <h1>Generate Worksheets Like Magic, With Ai</h1>
        <Link className="home-nav" to="/worksheet-generator">
          Try It Now{" "}
        </Link>
      </div>
      <img
        className="homePdf-img"
        src={homePDF}
        alt="pdf"
        style={{
          width: "800px",
          height: "100%",
          marginTop: "50px",
        }}
      />
      {/*<div className="home-page2"></div>*/}
    </div>
  );
};
