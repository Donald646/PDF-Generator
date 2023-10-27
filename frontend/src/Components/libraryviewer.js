import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PDFViewer } from "@react-pdf/renderer";
import { MyDocument } from "./document";
export default function LibraryViewer() {
  const { key } = useParams();
  const [documentData, setDocumentData] = useState([[], []]);
  useEffect(() => {
    const getAllPDFs = async () => {
      const response = localStorage.getItem(key);
      console.log("useEffect", response);
      setDocumentData(JSON.parse(response));
    };

    getAllPDFs();
  }, [key]);
  return (
    <PDFViewer
      className="pdf-viewer"
      width="100%"
      height="650"
      showToolbar={true}
    >
      <MyDocument response={documentData} />
    </PDFViewer>
  );
}
{
  /*
    <PDFViewer>
        <MyDocument response={documentData} />
      </PDFViewer>
    */
}
