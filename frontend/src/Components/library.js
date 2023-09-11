import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
const API_URL = "http://127.0.0.1:5000";
export const LibraryPage = () => {
  const [documentData, setDocumentData] = useState([]);
  useEffect(() => {
    const getAllPDFs = async () => {
      const response = await fetch(`${API_URL}/pdf`);
      const data = await response.json();
      setDocumentData(data);
    };

    getAllPDFs();
  }, []);
  return (
    <>
      <div className="library">
        {documentData.map((document) => {
          return (
            <div className="document-boxes" key={document.id}>
              <p>{document.file_name}</p>
              <a href={document.url}>Download Here</a>
            </div>
          );
        })}
      </div>
    </>
  );
};
