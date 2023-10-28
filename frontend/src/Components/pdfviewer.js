import { React, useState, useEffect } from "react";
import { MyDocument } from "./document";
import { PDFViewer } from "@react-pdf/renderer";

export const ViewPDF = ({ response, info }) => {
  const [fileName, setFileName] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    setIsClicked(false);
  }, [response]);

  const handleFileName = (e) => {
    setFileName(e.target.value);
  };

  function isKeyInLocalStorage(key) {
    return localStorage.getItem(key) !== null;
  }

  const handleSavePdf = async () => {
    if (fileName.length === 0) {
      alert("Enter a File Name Before Saving");
    } else if (isKeyInLocalStorage(fileName)) {
      alert("That file name has already been used.");
    } else {
      localStorage.setItem(fileName, JSON.stringify(response));
      setFileName("");
      setIsClicked(true);
    }
  };

  return (
    <div className="pdf-container">
      <PDFViewer
        className="pdf-viewer"
        width="100%"
        height="650"
        showToolbar={true}
      >
        <MyDocument response={response} info={info} />
      </PDFViewer>

      <button
        className="all-buttons save-button"
        onClick={handleSavePdf}
        style={
          isClicked ? { backgroundColor: "gray", cursor: "not-allowed" } : null
        }
      >
        Save to Library
      </button>
      <input
        type="text"
        placeholder="File Name"
        className="file-name-input"
        value={fileName}
        onChange={handleFileName}
      />
      {isClicked ? (
        <span className="successfully-saved-text">PDF Saved To Library</span>
      ) : null}
    </div>
  );
};
