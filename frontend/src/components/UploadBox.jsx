import React, { useState } from "react";
import { uploadPDF } from "../services/api";

function UploadBox({ onTextExtracted }) {
  const [fileName, setFileName] = useState("");
  const [previewText, setPreviewText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setLoading(true);

    try {
      const res = await uploadPDF(file);
      const text = res.text || "";
      setPreviewText(text.slice(0, 1500)); // preview first chunk
      onTextExtracted && onTextExtracted(text);
    } catch (err) {
      console.error(err);
      setPreviewText("Error while reading the file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="panel-title">
        Upload Study Material
        <span>PDF / Notes</span>
      </div>

      <p className="section-label">
        Upload your syllabus, notes, or assignments. AI will answer questions from
        this content.
      </p>

      <div className="upload-box">
        <label className="upload-input">
          Choose PDF file
          <input
            type="file"
            accept="application/pdf"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </label>

        <div className="upload-meta">
          {loading && "Reading and processing your document..."}
          {!loading && !fileName && "No file selected yet."}
        </div>

        {fileName && (
          <div className="upload-file-name">
            Selected: <strong>{fileName}</strong>
          </div>
        )}

        {previewText && (
          <div className="preview-box">
            <strong>Document Preview:</strong>
            <br />
            {previewText}
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadBox;
