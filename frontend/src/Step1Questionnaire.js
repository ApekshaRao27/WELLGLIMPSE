import React, { useState } from 'react';
import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Step2Result from './Step2Result';
import { getAuth } from "firebase/auth";


const questions = [
  "Do you have a family history of diabetes?",
  "Do you often feel excessive thirst?",
  "Do you urinate frequently?",
  "Have you experienced sudden weight loss recently?",
  "Do you feel tired or fatigued frequently?",
  "Do you have blurred vision occasionally?",
  "Are you physically active for at least 30 minutes daily?",
  "Do you have high blood pressure?",
  "Do you have trouble healing wounds or cuts?",
  "Is your BMI greater than 25?"
];

const Step1Questionnaire = () => {
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleAnswerChange = (e) => {
    setAnswers({ ...answers, [currentIndex]: e.target.value });
  };

  const handleNext = () => {
    if (answers[currentIndex] !== undefined) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert("Please select an option before continuing.");
    }
  };

 const handleSubmit = async () => {
  try {
    const answerValues = Array.from({ length: 10 }, (_, i) => answers[i] === "Yes" ? 1 : 0);
    let token = null;

    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      token = await user.getIdToken();
      console.log("Saved token:", token);
    }
     else {
      token = localStorage.getItem("token");
      console.log("Saved token:", token);
    }

    if (!token) {
      alert("User not logged in.");
      return;
    }

    //Predict diabetes risk
    const response = await axios.post(
      'http://localhost:5001/predict',
      { answers: answerValues },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { predictedLabel, riskScore } = response.data;
    const mongoId = localStorage.getItem("mongoId");

    //Save to Firestore
    await addDoc(collection(db, 'questionnaireResponses'), {
      uid: mongoId,
      answers,
      predictedLabel,
      riskScore,
      timestamp: serverTimestamp(),
    });

    const suggestionRes = await axios.post('http://localhost:5001/generate-suggestions', {
      risk: predictedLabel,
      answers,
    },{
      headers: {
      Authorization: `Bearer ${token}`, 
    },
    });

    const suggestion = suggestionRes.data.suggestion;

    //Navigate with risk, score, and suggestion
    setSubmitted(true);
    navigate('/Step2Result', {
      state: {
        predictedLabel,
        riskScore,
        suggestion,
      }
    });

  } catch (error) {
    console.error("Error saving to Firestore or predicting:", error);
    alert("Failed. Please try again.");
  }
};

  if (submitted) {
    return (
      <div style={styles.container}>
        <h2>Thank you!</h2>
        <p>Your responses have been submitted.</p>
      </div>
    );
  }

  return (
    <div>
    <div style={styles.container}>
      <h2 style={styles.title}>Diabetes Risk Questionnaire</h2>
      {currentIndex < questions.length && (
        <>
          <p style={styles.question}>{questions[currentIndex]}</p>
          <div style={styles.options}>
            <label>
              <input
                type="radio"
                name="answer"
                value="Yes"
                checked={answers[currentIndex] === "Yes"}
                onChange={handleAnswerChange}
              /> Yes
            </label>
            <label style={{ marginLeft: "20px" }}>
              <input
                type="radio"
                name="answer"
                value="No"
                checked={answers[currentIndex] === "No"}
                onChange={handleAnswerChange}
              /> No
            </label>
          </div>

          {currentIndex > 0 && (
            <button style={{ ...styles.button, marginRight: '10px' }} onClick={() => setCurrentIndex(currentIndex - 1)}>
              Back
            </button>
          )}

          {currentIndex < questions.length - 1 ? (
            <button style={styles.button} onClick={handleNext}>
              Next
            </button>
          ) : (
            <button style={styles.submitBtn} onClick={handleSubmit}>
              Submit Answers
            </button>
          )}
        </>
      )}
    </div>

    </div>
  );
};

const styles = {
  container: {
    maxWidth: "90vw",
    margin: "20px auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    textAlign: "center",
    color: "#000000",
     boxSizing: "border-box",
  },
  title: {
    marginBottom: "20px"
  },
  question: {
    fontSize: "18px",
    marginBottom: "12px"
  },
  options: {
    marginBottom: "20px"
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px 18px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    width: "100%",                
  maxWidth: "200px", 
  },
  submitBtn: {
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "12px 24px",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",   
    width:"100%",
     maxWidth: "200px", 
  }
};

export default Step1Questionnaire;
