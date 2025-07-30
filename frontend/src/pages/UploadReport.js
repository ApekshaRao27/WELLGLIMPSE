import React, { useState } from "react";
import axios from "axios";
import ManualEntryForm from "./manualentryForm";
import { getAuth } from "firebase/auth";
function UploadReport() {
  const [file, setFile] = useState(null);
  const [uploadResult, setUploadResult] = useState(null);
  const [manualResult, setManualResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message,setMessage]=useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadResult(null);
    setManualResult(null);
  };

  const getAuthToken = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    return await user.getIdToken(); // Firebase
  }

  return localStorage.getItem("token"); // Manual login
};

  const handleUpload = async () => {
  if (!file)
     setMessage("Please select a pdf file");

  const formData = new FormData();
  formData.append("file", file);

  setLoading(true);
  try {
    const token = await getAuthToken();
     const BASE_URL = process.env.REACT_APP_PDF_API_URL || 'http://localhost:5003';
    const res = await axios.post(`${BASE_URL}/analyze`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    setUploadResult(res.data);
    setManualResult(null);
  } catch (err) {
    console.error(err);
  }
  setLoading(false);
};


  return (
    <div className="container-fluid px-3 mt-5" style={{ textAlign: "center" }}>

      <h2 className="mb-3">Upload Your Lab Report</h2>
      <p style={{color:"rgb(240, 104, 104)"}}>Note: Uploaded lab reports might not be processed correctly every time.
For best results, please enter your data manually.</p>
       {message && <h5 style={{ color: 'red', }}>{message}</h5>}
      <input type="file" accept="application/pdf" onChange={handleFileChange} style={{
      width: "100%",
      maxWidth: "280px",
      fontSize: "14px",
    }}/>
      <button className="btn btn-primary mt-3" onClick={handleUpload} disabled={loading}>
        {loading ? "Analyzing..." : "Upload & Analyze"}
      </button>

      {/* Uploaded report result */}
      {uploadResult && (
        <div
  className="mt-5 shadow"
  style={{
    backgroundColor: '#0d559dff',
    color:"white",
    padding: "20px 25px",
    borderRadius: "12px",
    fontFamily:["Segoe UI", "Roboto", "sans-serif"],
    maxWidth: "600px",
    width:"100%",
    margin: "auto",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e2e8f0",
    
  }}
>
          {uploadResult?.extracted?.overall ? (
            <>
              <h5>Diabetes Risk: {uploadResult.extracted.overall}</h5>

              <div>
                <h5>Extracted Report Values:</h5>
                <ul>
                  {Object.entries(uploadResult?.extracted?.results || {}).map(([key, value], idx) => (
                    <p key={idx}>
                      <strong>{key}:</strong> {value ?? "Not Found"}
                    </p>
                  ))}
                </ul>
              </div>

              {uploadResult?.extracted?.risk_flags?.length > 0 ? (
                <ul>
                  {uploadResult.extracted.risk_flags.map((flag, idx) => (
                    <p key={idx}>{flag}</p>
                  ))}
                </ul>
              ) : (
                <p>No risk flags found.</p>
              )}

              <h5 className="mt-4">Suggestions:</h5>
              <pre style={{ whiteSpace: "pre-wrap" }}>{uploadResult.ai_advice}</pre>
            </>
          ) : (
            <p>No diabetes indicators were found in the uploaded report. Please upload a valid report.</p>
          )}
        </div>
      )}
      {/* Manual Entry */}
      <div className="mt-5">
        
        <ManualEntryForm onManualResult={setManualResult} />

        {/* Manual result display */}
        {manualResult && (
          <div
  className="mt-5 shadow"
  style={{
    backgroundColor: '#0d559dff',
    color:"white",
    padding: "20px 25px",
    borderRadius: "12px",
    fontFamily:["Segoe UI", "Roboto", "sans-serif"],
    maxWidth: "600px",
    margin: "auto",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e2e8f0",
  }}
>
            <h5>Manual Analysis Result</h5>
            <p><strong>Overall Risk:</strong> {manualResult.extracted.overall}</p>
            <ul>
              {manualResult.extracted.risk_flags.map((flag, idx) => (
                <li key={idx}>{flag}</li>
              ))}
            </ul>
            <h6 className="mt-3">Advice:</h6>
            <pre>{manualResult.ai_advice}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadReport;
