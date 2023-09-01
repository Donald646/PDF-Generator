import { React } from "react";
import { MyDocument } from "./document";
import { PDFViewer } from "@react-pdf/renderer";
export const ViewPDF = ({ handleDownloadPdf, response }) => {
  return (
    <div className="pdf-container">
      <PDFViewer className="pdf-viewer" width="100%" height="650">
        <MyDocument response={response} />
      </PDFViewer>
      <button className="all-buttons save-button" onClick={handleDownloadPdf}>
        Save to Library
      </button>
    </div>
  );
};
