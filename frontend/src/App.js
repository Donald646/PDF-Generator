import "./App.css";
import { React, useState, useEffect } from "react";
import { MyDocument } from "./Components/document";
import { PromptInput } from "./Components/promptinput";
import { LibraryPage } from "./Components/library";
import { ViewPDF } from "./Components/pdfviewer";
import { AboutPage } from "./Components/about";
import { usePDF } from "@react-pdf/renderer";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const API_URL = "http://127.0.0.1:5000";
function App() {
  const [input, setInput] = useState(""); //is in parent component to check for length
  const [response, setResponse] = useState([]);
  const [url, setURL] = useState("");
  const MyDoc = <MyDocument response={response} />;
  const [instance, updateInstance] = usePDF({ document: MyDoc });

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleResponse = (textArray) => {
    setResponse(textArray);
  };

  const handleDownloadPdf = async () => {
    if (input.length === 0) {
      return alert("Enter a prompt");
    }
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
  };

  return (
    <BrowserRouter>
      <nav>
        <h1>
          <Link className="title" to="/">
            Worksheet Wiz
          </Link>
        </h1>
        <div className="nav-bar-buttons">
          <Link className="library-link" to="/Library">
            Library
          </Link>
          <Link className="library-link" to="/About">
            About
          </Link>
        </div>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <ViewPDF
                handleDownloadPdf={handleDownloadPdf}
                response={response}
              />
              <PromptInput
                input={input}
                handleInput={handleInput}
                handleResponse={handleResponse}
                setInput={setInput}
              />
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
