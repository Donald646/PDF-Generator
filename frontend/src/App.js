import "./App.css";
import { React, useState } from "react";
import { MyDocument } from "./Components/document";
import { PromptInput } from "./Components/promptinput";
import { LibraryPage } from "./Components/library";
import { ViewPDF } from "./Components/pdfviewer";
import { AboutPage } from "./Components/about";
import { DefaultInput } from "./Components/defaultinput";
import { usePDF } from "@react-pdf/renderer";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Switch } from "@mui/material/";
import { Home } from "./Components/home";
import worksheetLogo from "./worksheetLogo.png";

const API_URL = "https://worksheetcreator-32445e06bf4d.herokuapp.com";
//const API_URL = "http://127.0.0.1:5000";

function App() {
  //is in parent component to check for length of prompt
  const [response, setResponse] = useState([[], []]);
  const [url, setURL] = useState("");
  const MyDoc = <MyDocument response={response} />;
  const [instance] = usePDF({ document: MyDoc });
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

  const handleDownloadPdf = async () => {
    setURL(instance.url);
    const jsonData = {
      file_name: "idk.pdf",
      url: url,
    };

    const request = await fetch(`${API_URL}/pdf`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });
    console.log("Download Succesfully");
    console.log(request);
  };

  const handleAdvanced = () => {
    setAdvancedMode(!advancedMode);
  };

  const handleInfo = (object) => {
    setInfo(object);
  };

  return (
    <BrowserRouter>
      <nav>
        <h1>
          <Link className="title" to="/">
            <img src={worksheetLogo} alt="logo" className="title-img" />
          </Link>
        </h1>
        {/* 
        <Link className="library-nav link" to="/Library">
            Library
          </Link>
        <Link className="about link" to="/About">
            About
          </Link>
        */}
        <div className="nav-bar-buttons">
          <Link className="worksheet link" to="/worksheet-generator">
            Generator
          </Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/worksheet-generator"
          element={
            <>
              {response[0].length !== 0 ? (
                <ViewPDF
                  handleDownloadPdf={handleDownloadPdf}
                  response={response}
                  info={info}
                />
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
                  />
                </>
              )}
            </>
          }
        />

        <Route path="/Library" element={<LibraryPage />} />
        <Route path="/About" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
