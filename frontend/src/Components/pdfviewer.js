import { React, useState } from "react";
import { MyDocument } from "./document";
import { PDFViewer } from "@react-pdf/renderer";

export const ViewPDF = ({ response, info }) => {
  const [fileName, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileName = (e) => {
    setFileName(e.target.value);
  };
  const handleDownloadPdf = async () => {
    setIsLoading(true);
    if (fileName.length === 0) {
      alert("Enter a File Name Before Saving");
    } else {
      localStorage.setItem(fileName, JSON.stringify(response));
      setFileName("");
    }
    setIsLoading(false);
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

      <button className="all-buttons save-button" onClick={handleDownloadPdf}>
        Save to Library
      </button>
      <input
        type="text"
        placeholder="File Name"
        className="file-name"
        value={fileName}
        onChange={handleFileName}
      />
    </div>
  );
};
