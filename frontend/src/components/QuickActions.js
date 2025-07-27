import React from 'react';

import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
    const navigate = useNavigate();
    
    const handleChatFocus = () => {
  const chat = document.getElementById('right-panel');
  chat?.classList.add('chat-highlight');
  // remove after 1.5 seconds
  setTimeout(() => {
    chat?.classList.remove('chat-highlight');
  }, 1500);
};

  // Aiva speaks using Web Speech API
  const handleSpeak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 1.4;
    utterance.rate = 1.05;
    utterance.volume = 1;
    utterance.voice = window.speechSynthesis.getVoices().find(voice => voice.name.includes("Google")) || window.speechSynthesis.getVoices()[0];
    window.speechSynthesis.cancel(); // Cancel previous speech
    window.speechSynthesis.speak(utterance);
  };



  return (
      <div className="flex-fill" style={{ maxWidth: '300px' }}>
      <h2 style={styles.title}>Quick Actions</h2>

      <button
        style={styles.button}
        onMouseEnter={() => handleSpeak("Let's start a new test and check your status!")}
        onClick={() => navigate('/Step1Questionnaire')}
      >
        Start New Test
      </button>

      <button
        style={styles.button}
        onMouseEnter={() => handleSpeak("Wanna see your past test results? Let's dig in!")}
        onClick={() => navigate('/pages/UploadReport')}
      >
        Analyze Previous Result
      </button>

      <button
        style={styles.button}
        onClick={() => navigate('/components/DiabetesInfo')}
        onMouseEnter={() => handleSpeak("Explore helpful resources to guide your journey!")}
      >
        Explore Resources
      </button>

      <button
        style={styles.button}
        onClick={handleFindHospitals}
        onMouseEnter={() => handleSpeak("Hang on! Finding the nearest hospitals for you...")}
      >
        Find Hospitals
      </button>

      <button
        style={styles.button}
        onMouseEnter={() => handleSpeak("Let's have a chat! I'm here to help anytime.")}
        onClick={handleChatFocus}
      >
        Chat with AI Buddy
      </button>
    </div>
  );
};

const styles = {
  title: {
    fontSize: '20px',
    marginBottom: '16px',
    fontWeight: '600',
  },
  button: {
    display: 'block',
    width: '100%',
    marginBottom: '12px',
    padding: '12px 16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

  // Find nearby hospitals using GPS
 export const handleFindHospitals = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const googleMapsUrl = `https://www.google.com/maps/search/hospitals/@${lat},${lon},14z`;
          window.open(googleMapsUrl, "_blank");
        },
        (error) => {
          alert("Please enable location services to find nearby hospitals.");
          console.error(error);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

export default QuickActions;      