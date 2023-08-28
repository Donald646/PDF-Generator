import { React } from "react";
import { MyDocument } from "./document";
import { PDFViewer } from "@react-pdf/renderer";
export const ViewPDF = ({ handleDownloadPdf, response }) => {
  return (
    <div className="propmpt-input-container">
      <PDFViewer width="100%" height="650">
        <MyDocument response={response} />
      </PDFViewer>
      <button onClick={handleDownloadPdf}>Save to Library</button>
    </div>
  );
};
