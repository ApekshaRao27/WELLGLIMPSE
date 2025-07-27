import React, { useState } from "react";
import axios from "axios";

const apiKey = process.env.REACT_APP_GEMINI_API_KEY;

function ChatBox() {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");

  const generateAnswer = async () => {
    if (!userInput.trim()) return;//this when user press empty string
      
    try {
      const res = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`,
        {
          contents: [
            {
              role: "user",
              parts: [{ text: userInput }],
            },
          ],
        }
      );

      const output =
        res?.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No answer";

      setResponse(output);
      setUserInput("");
    } catch (err) {
      console.error(err);
      setResponse("Error fetching answer.");
    }
  };

  return (
    <div className="container px-3">
  
    <div
  className="chatbox-container w-100"
  style={{
    background: '#1c1c1e',
    color: 'white',
    border: '1px solid #444',
    borderRadius: '12px',
    padding: '24px',
    maxWidth: '100%',
    height: '500px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
    fontFamily: 'Segoe UI, sans-serif'
  }}
>
  <h6
    style={{
      fontSize: '20px',
      fontWeight: '600',
      marginBottom: '16px',
      color: '#00aaff'
    }}
  >
    AI Health Assistant
  </h6>

  <div
    style={{
      flexGrow: 1,
      backgroundColor: '#2c2c2e',
      borderRadius: '8px',
      padding: '16px',
      overflowY: 'auto',
      whiteSpace: 'pre-wrap',
      marginBottom: '16px',
      color: '#f2f2f2'
    }}
  >
    {response || "Hello! I'm Aiva!! your personalized AI. Ask me anything!"}
  </div>

  <div style={{ display: 'flex', gap: '12px' }}>
    <input
      type="text"
      className="form-control"
      placeholder="Type anything about diabetes..."
      value={userInput}
      onChange={(e) => setUserInput(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && generateAnswer()}
      style={{
        flexGrow: 1,
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid #555',
        backgroundColor: 'lightgray',
        color: 'white',
        fontSize: '15px',
        outline: 'none',
      }}
    />
    <button
      onClick={generateAnswer}
      style={{
        backgroundColor: '#00aaff',
        border: 'none',
        padding: '12px 20px',
        borderRadius: '8px',
        color: 'white',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        boxShadow: '0 0 8px rgba(0,170,255,0.6)',
        transition: 'transform 0.2s ease',
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
    >
      ➤
    </button>
  </div>
</div>
</div>
  );
}

export default ChatBox;

