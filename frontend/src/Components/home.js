import React from "react";
import { Link } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
//import { Box, CircularProgress } from "@mui/material/";
import homePDF from "./homePDF2.png";

export const Home = () => {
  return (
    <div className="home-page">
      <div className="home-page1">
        <h2>Create Completely Customized Worksheets In Seconds</h2>
        <h1>Customized Worksheets, Generated With AI.</h1>
        <Link className="home-nav" to="/worksheet-generator">
          Try It Now{" "}
          <span>
            <ExitToAppIcon className="exit-icon" />
          </span>
        </Link>
      </div>
      <div className="home-page2">
        <img
          className="homePdf-img"
          src={homePDF}
          alt="pdf"
          style={{ width: "750px", height: "100", borderRadius: "20px" }}
        />
      </div>
    </div>
  );
};
