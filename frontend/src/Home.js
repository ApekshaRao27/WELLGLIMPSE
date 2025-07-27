import {React,useState,useEffect} from "react";
import AIDiagnosisSummary from './components/AIDiagnosisSummary';
import DailyChallenges from "./components/DailyChallenges";
import ChatBox from "./components/ChatBox";
import QuickActions from "./components/QuickActions";
import Character from "./components/AIGuideAvatar";
import DoctorAnimation from "./components/AIGuideAvatar";
 import { fetchUserScores } from "./fetchUserScores";
function Home(){
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
 const name = localStorage.getItem('name');
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://formspree.io/f/xeokyzlg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 4000);
      } else {
        alert("Failed to submit the issue.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    }
  };


useEffect(() => {
  const loadData = async () => {
    const scores = await fetchUserScores();
    console.log("Fetched Scores:", scores);
  };
  loadData();
}, []);

  return (
 <div className="container" style={styles.container}>
  <main style={styles.main}>
    <header className="header" style={styles.header}>
      <h1>Welcome, {name}</h1>
    </header>

    <div className="main-grid" style={styles.mainGrid}>
      <div className="left-panel" style={styles.leftPanel}>
        <QuickActions/>
        <DailyChallenges />
      </div>

      <div className="center-panel" style={styles.centerPanel}>
        <AIDiagnosisSummary />
      </div>

      <div className="right-panel" id="right-panel" style={styles.rightPanel}>
        <ChatBox />
        <DoctorAnimation />
      </div>
    </div>
  </main>

  <footer className="footer" id="footer" style={styles.footer}>
    <h3 style={styles.footerTitle}>Report an Issue</h3>
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        required
        style={styles.input}
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
        required
        style={styles.input}
      />
      <textarea
        name="message"
        placeholder="Describe the issue..."
        value={formData.message}
        onChange={handleChange}
        required
        rows="4"
        style={styles.textarea}
      ></textarea>
      <button type="submit" style={styles.submitBtn}>Submit</button>
    </form>

    {submitted && (
      <div style={styles.popup}>
        <p>✅ Issue has been submitted!</p>
      </div>
    )}

    <p style={styles.footerText}>&copy; 2025 WellGlimse</p>
  </footer>
</div>

  )}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    overflowX: 'hidden'
  },
  main: {
    flex: 1,
    padding: '20px',
  },
  header: {
    marginBottom: '20px',
  },
  mainGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '100vw',
    margin: '0 auto',
    overflowX: 'hidden', 
  },
 
  leftPanel: {
    flex: 1,
    minWidth: '0',
    width: '100%',
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  centerPanel: {
    flex: 2,
    minWidth: '0',
    width: '100%',
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  rightPanel: {
    flex: 1,
    minWidth: '0',
    width: '100%',
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  footer: {
    backgroundColor: '#2e2e2e',
    color: 'white',
    padding: '30px 20px',
    textAlign: 'center',
    marginTop: 'auto',
    width: '100%',
  },
  footerTitle: {
    fontSize: '22px',
    marginBottom: '12px',
  },
  footerText: {
    marginTop: '25px',
    fontSize: '14px',
    color: '#aaa',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    alignItems: 'center',
    maxWidth: '100%',
    width: '100%',
    margin: '0 auto',
    marginTop: '10px',
  },
  input: {
    width: '100%',
    maxWidth: '400px',
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #555',
    backgroundColor: '#444',
    color: 'white',
    fontSize: '15px',
  },
  textarea: {
    width: '100%',
    maxWidth: '400px',
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #555',
    backgroundColor: '#444',
    color: 'white',
    fontSize: '15px',
    resize: 'none',
  },
  submitBtn: {
    padding: '12px 24px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  popup: {
    marginTop: '16px',
    backgroundColor: '#28a745',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '6px',
    display: 'inline-block',
    fontWeight: 'bold',
  },
};



export default Home;