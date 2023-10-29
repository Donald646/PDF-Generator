import "./App.css";
import { React, useState } from "react";

import { PromptInput } from "./Components/promptinput";
import { LibraryPage } from "./Components/library";
import { ViewPDF } from "./Components/pdfviewer";
import { AboutPage } from "./Components/about";
import { DefaultInput } from "./Components/defaultinput";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Switch } from "@mui/material/";
import { Home } from "./Components/home";
import worksheetLogo from "./worksheetLogo.png";

import LibraryViewer from "./Components/libraryviewer";

//const API_URL = "https://worksheetcreator-32445e06bf4d.herokuapp.com";
//const API_URL = "http://127.0.0.1:5000";

function App() {
  //is in parent component to check for length of prompt
  const [response, setResponse] = useState([[], []]);
  const [isLoading, setIsLoading] = useState(false);
  const [advancedMode, setAdvancedMode] = useState(false);

  const [info, setInfo] = useState({
    type: "default",
    grade: "",
    topic: "",
    length: "",
    hint: false,
    questionType: "",
    answerKey: false,
  });

  const handleResponse = (array) => {
    setResponse(array);
  };

  const handleAdvanced = () => {
    setAdvancedMode(!advancedMode);
  };

  const handleInfo = (object) => {
    setInfo(object);
  };

  const handleLoading = (value) => {
    setIsLoading(value);
  };

  return (
    <BrowserRouter>
      <nav>
        <h1>
          <Link className="title" to="/">
            <img src={worksheetLogo} alt="logo" className="title-img" />
          </Link>
        </h1>
        <div className="nav-bar-buttons">
          <Link className="library-nav link" to="/Library">
            Library
          </Link>
          <Link className="generator link" to="/worksheet-generator">
            Generator
          </Link>
          {/*
        <Link className="about link" to="/About">
          About
        </Link>
        */}
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/worksheet-generator"
          element={
            <>
              {response[0].length !== 0 ? (
                <ViewPDF response={response} info={info} />
              ) : isLoading ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "500px",
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : null}

              <Switch
                checked={advancedMode}
                onChange={handleAdvanced}
                inputProps={{ "aria-label": "controlled" }}
                name="Advanced Mode"
              />
              {advancedMode ? (
                <>
                  <span>Advanced</span>
                  <PromptInput handleResponse={handleResponse} />
                </>
              ) : (
                <>
                  <span>Default (Recommended)</span>
                  <DefaultInput
                    handleResponse={handleResponse}
                    handleInfo={handleInfo}
                    info={info}
                    isLoading={isLoading}
                    handleLoading={handleLoading}
                  />
                </>
              )}
            </>
          }
        />

        <Route path="/Library" element={<LibraryPage />} />
        <Route path="/About" element={<AboutPage />} />
        <Route path="/library-viewer/:key" element={<LibraryViewer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
