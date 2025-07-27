import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuth } from "firebase/auth";

function ManualEntryForm({ onManualResult }) {
  useEffect(() => {
    console.log("🧩 ManualEntryForm mounted");
  }, []);

  const [formData, setFormData] = useState({
    "RANDOM BLOOD SUGAR": "",
    "HBA1C": "",
    "CREATININE": "",
    "SGOT": "",
    "SGPT": "",
    "CRP": "",
    "WBC": "",
    "PATIENT NAME": ""
  });

  const [naFields, setNAFields] = useState({
    "RANDOM BLOOD SUGAR": false,
    "HBA1C": false,
    "CREATININE": false,
    "SGOT": false,
    "SGPT": false,
    "CRP": false,
    "WBC": false
  });

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const toggleNA = (key) => {
    setNAFields((prev) => ({ ...prev, [key]: !prev[key] }));
    if (!naFields[key]) {
      setFormData((prev) => ({ ...prev, [key]: "" }));
    }
  };

  const getAuthToken = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    return await user.getIdToken(); // Firebase
  }

  return localStorage.getItem("token"); // Manual login
};

  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("📤 Submitting manual form:", formData);

  const payload = {};
  Object.entries(formData).forEach(([key, value]) => {
    payload[key] = naFields[key] ? "NA" : value || null;
  });

  try {
    const token = await getAuthToken();
    console.log("🔐 Sending token:", token);
    const res = await axios.post("http://127.0.0.1:5003/analyze_manual", payload, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    console.log("✅ Backend response:", res.data);
    if (res.data.status === "no_data") {
  alert(res.data.message || "Please provide a valid input.");
  return;
}

    onManualResult(res.data);
  } catch (err) {
    console.error(err);
    alert("Error during manual analysis");
  }
};

  const fields = [
    "PATIENT NAME",
    "RANDOM BLOOD SUGAR",
    "HBA1C",
    "CREATININE",
    "SGOT",
    "SGPT",
    "CRP",
    "WBC"
  ];

  return ( 
  <div
  className="mt-5 shadow"
 style={{
  backgroundColor: '#0d559dff',
  color: 'white',
  padding: '20px 25px',
  borderRadius: '12px',
  fontFamily: 'Segoe UI, Roboto, sans-serif',
  maxWidth: '600px',
  width: '100%',              
  margin: 'auto',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
  border: '1px solid #e2e8f0',
  boxSizing: 'border-box',    
  overflowX: 'hidden',        
}}
>
      <form onSubmit={handleSubmit}>
        <h4 className="mb-4">Enter Lab Values Manually</h4>
        {fields.map((field) => (
          <div className="mb-3" key={field}>
            <label>{field}:</label>
            <div className="d-flex gap-3">
              <input
                value={formData[field]}
                onChange={(e) => handleInputChange(field, e.target.value)}
                type={field === "PATIENT NAME" ? "text" : "number"}
                className="form-control"
                disabled={naFields[field]}
              />
              {field !== "PATIENT NAME" && (
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => toggleNA(field)}
                >
                  {naFields[field] ? "Undo N/A" : "Mark N/A"}
                </button>
              )}
            </div>
          </div>
        ))}
        <button type="submit" className="btn btn-warning mt-3">Analyze Manually</button>
      </form>
    </div>
  );
}

export default ManualEntryForm;
