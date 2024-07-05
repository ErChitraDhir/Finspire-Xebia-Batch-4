import React, { useState, useRef } from "react";
import "../styles/dragndrop.css";

const DragnDrop = () => {
  const [files, setFiles] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState("");

  const inputRef = useRef();

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (
      droppedFiles.length === 1 &&
      droppedFiles[0].type === "application/pdf" &&
      droppedFiles[0].size <= 500000
    ) {
      setFiles(droppedFiles);
    } else {
      alert("Please drop a single PDF file with a maximum size of 500KB.");
    }
  };

  const handleUpload = () => {};

  const handleDocumentChange = (event) => {
    setSelectedDocument(event.target.value);
  };

  if (!selectedDocument) {
    return (
      <div className="dropdown-container">
        <h1 className="dnd">Identity Verification</h1>
        <select
          className="dropdown"
          value={selectedDocument}
          onChange={handleDocumentChange}
        >
          <option value="">Select Document Type</option>
          <option value="Pan Card">Pan Card</option>
          <option value="Aadhar Card">Aadhar Card</option>
        </select>
      </div>
    );
  }

  if (files) {
    return (
      <div className="uploads">
        <ul>
          {Array.from(files).map((file, idx) => (
            <li key={idx}>{file.name}</li>
          ))}
        </ul>
        <div className="actions">
          <button onClick={() => setFiles(null)} className="dnd-btn">
            Cancel
          </button>
          <button onClick={handleUpload} className="dnd-btn">
            Next
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dropzone" onDragOver={handleDragOver} onDrop={handleDrop}>
      <h1>Drag and Drop a PDF file (max 500KB) to Upload {selectedDocument}</h1>
      <input
        type="file"
        accept=".pdf"
        onChange={(event) => {
          const selectedFile = event.target.files[0];
          if (
            selectedFile &&
            selectedFile.type === "application/pdf" &&
            selectedFile.size <= 500000
          ) {
            setFiles(event.target.files);
          } else {
            alert(
              "Please select a single PDF file with a maximum size of 500KB."
            );
          }
        }}
        hidden
        ref={inputRef}
      />
      <br />
      <button onClick={() => inputRef.current.click()} className="dnd-btn">
        Select Files
      </button>
    </div>
  );
};

export default DragnDrop;
