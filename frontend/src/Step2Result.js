import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import reportImg from './assets/report-img.png';


const Step2Result = () => {
  const location = useLocation();
  const [riskScore, setRiskScore] = useState(null);
  const [predictedLabel, setPredictedLabel] = useState("");
  const { suggestion } = location.state || {};

  useEffect(() => {
    if (location.state?.riskScore !== undefined) {
      setRiskScore(location.state.riskScore);
      setPredictedLabel(location.state.predictedLabel || "");
    } 
    }
  );

  const riskText =
    riskScore >= 0.7
      ? "High Risk"
      : riskScore >= 0.4
      ? "Moderate Risk"
      : "Low Risk";

  const riskColor =
    riskScore >= 0.8
      ? "rgb(255, 0, 0)"
      : riskScore >= 0.5
      ? "rgb(239, 252, 0)"
      : "rgb(58, 164, 1)";

  const message= riskText==="High Risk"?"We strongly recommend consulting a healthcare professional and taking proactive steps to manage your health.":
              riskText==="Moderate Risk"?"You may consider consulting a healthcare provider to better understand your risk and get personalized tips.":
             "This is a good opportunity to focus on preventive measures.";
             
  return (
    <div className="container px-3" style={{ backgroundColor: "#0a0f2c"}}>
    <div className="text-white" style={{ backgroundColor: "#0a0f2c", minHeight: "100vh" ,overflowX:"hidden"}}>
      {/* Top Title and Info */}
      <div className="row align-items-center mb-5 p-4">
        <div className="col-md-7">
          <h1>Hello {localStorage.getItem('name')}, Here Are Your Results!</h1>
          <p className="lead">
            Your diabetes risk assessment indicates a <strong>{riskText}</strong>.   
            {message}      
          </p>
          <p>
            Based on your recent answers, here's a detailed overview of your health and personalized recommendations.
          </p>
        </div>
        <div className="col-12 col-md-5">
          <img
  src={reportImg}
  alt="Report"
  className="img-fluid rounded mx-auto d-block"
  style={{
    minWidthwidth: "0",
    maxWidth: "300px",
    objectFit: "cover",
  }}


 />
        </div>
      </div>

      {/* Risk Score Section */}
      <div className="row mb-4">
        <div className="col-md-6 text-center p-4" style={{ backgroundColor: "#1c223f", borderRadius: "15px" }}>
          <h3>Your Diabetes Risk</h3>
          <div style={{ fontSize: "2rem", color: riskColor, margin: "20px 0" }}>
            ● {riskText}
          </div>
          <div style={{ fontSize: "2rem", color: riskColor, margin: "20px 0" }}>
            {Number.isFinite(riskScore) ? (
              <p>● {(riskScore * 100).toFixed(2)}%</p>
            ) : (
              <p>● --%</p>
            )}
          </div>
          <p>This score reflects your current assessment based on the provided health data.</p>
        </div>

        {/* What's Next Section */}
        <div className="col-md-6 p-4" style={{ backgroundColor: "#1c223f", borderRadius: "15px" }}>
          <h4>What's Next?</h4>
          <ul>
            <li>Explore our resources on diabetes management.</li>
            <li>Schedule a follow-up assessment in 3 months.</li>
            <li>Consult a healthcare professional.</li>
          </ul>
        </div>
        <div className="mt-4">
  <h5>Health Suggestions</h5>
  <p>{suggestion || "No suggestions available."}</p>
</div>
      </div>
    </div>
    </div>
  );
};

export default Step2Result;
