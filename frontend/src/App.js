import "./App.css";
import { React, useState, useEffect } from "react";
import { MyDocument } from "./document";
import { PromptInput } from "./promptinput";
import { ViewPDF } from "./pdfviewer";
import { usePDF } from "@react-pdf/renderer";

const API_URL = "http://127.0.0.1:5000";
function App() {
  const [input, setInput] = useState(""); //is in parent component to check for length
  const [response, setResponse] = useState([]); //might have to turn into a list so can easily deconstruct in document.js
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
    <>
      <h1>PDF Generator</h1>
      <ViewPDF handleDownloadPdf={handleDownloadPdf} response={response} />
      <PromptInput
        input={input}
        handleInput={handleInput}
        handleResponse={handleResponse}
        setInput={setInput}
      />
    </>
  );
}

export default App;
