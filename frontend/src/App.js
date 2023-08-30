import "./App.css";
import { React, useState, useEffect } from "react";
import { MyDocument } from "./document";
import { PromptInput } from "./promptinput";
import { LibraryPage } from "./library";
import { ViewPDF } from "./pdfviewer";

import { usePDF } from "@react-pdf/renderer";
import { BrowserRouter, Routes, Route, Link, Router } from "react-router-dom";

const API_URL = "http://127.0.0.1:5000";
function App() {
  const [input, setInput] = useState(""); //is in parent component to check for length
  const [response, setResponse] = useState([]);
  const [url, setURL] = useState("");
  const MyDoc = <MyDocument response={response} />;
  const [instance, updateInstance] = usePDF({ document: MyDoc });
  const [isOnLibrary, setIsOnLibrary] = useState(false);

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
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1>PDF Generator</h1>

              <Link className="library-link" to="/Library">
                Library
              </Link>

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
