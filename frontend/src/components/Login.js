import  React,{useState,useEffect }  from 'react';
import logo from '../assets/logo.png'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PasswordInput from './PasswordInput';
import {auth,provider} from '../main';
import { signInWithPopup,getAuth } from "firebase/auth";
import EmailPage from '../pages/emailpage';

const Login = () => {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
  const navigate = useNavigate();
  

    // If already logged in, redirect to /Home
  useEffect(() => {
    if (localStorage.getItem('isLoggedIn')) {
      navigate('/Home');
    }
  }, []);

  const handleLogin = async () => {
  try {
    
    const res = await axios.post('http://localhost:5000/api/auth/login', {
      email,
      password
    },{
  withCredentials: true //to allow cookies to be sent
});
     setMessage("Login successful");
     console.log("Response from backend:", res);

      localStorage.setItem("token",res.data.token);
     
     // During manual login (save to localStorage)   
     localStorage.setItem('isLoggedIn', true);  
     localStorage.setItem('name', res.data.user.name);
   localStorage.setItem("mongoId", res.data.user.id);
   
    // Optional: store user in localStorage
    localStorage.setItem('user', JSON.stringify(res.data.user));
      setTimeout(() => {
  navigate('/home', { replace: true });
}, 2000);
  } catch (err) {
   setMessage("Invalid Credentials!!");
  }
};

const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const idToken = await user.getIdToken(); // ✅ Firebase token

    // Send ID token to backend for verification + JWT cookie
    const res = await axios.post(
      "http://localhost:5000/api/auth/google-login",
      { idToken },
      { withCredentials: true } // ⚠️ Very important for cookie
    );

    // Only store what’s absolutely needed
    localStorage.setItem("mongoId", res.data.mongoId); // Optional, or use context/state

    setMessage("Google login successful");

    setTimeout(() => {
      navigate("/home", { replace: true });
    }, 2000);
  } catch (error) {
    console.error("Google login error:", error);
    setMessage("Google login failed");
  }
};


  return (
    <div style={styles.container} className='login-wrapper'>
      <div style={styles.leftPanel}>
        <img src={logo} alt="WellGlimse Logo" style={styles.logo} />
        <h2 style={styles.welcome}>Welcome back!</h2>
        <p style={styles.tagline}>Your wellness journey simplified.</p>
          
        {/* Social login buttons */}
        <div style={styles.socialContainer}>
          <button id='google-login-btn' onClick={handleGoogleLogin} style={{ ...styles.socialBtn, backgroundColor: '#f44336' }}>
            <span style={styles.icon}>G</span> Sign in with Google
          </button>
        </div>
        {/* Message*/}
         {message && (
  <p
    style={{
      color: message.includes('success') ? 'green' : 'red',
      marginBottom: '10px',
      fontWeight: 'bold',
    }}
  >
    {message}
  </p>
)}
{/* Email login form */}
        <input type="email" placeholder="Email"  value={email} onChange={(e) => setEmail(e.target.value)}  style={styles.input} />
        <PasswordInput
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  style={styles.input}
 
/>
        <div style={styles.options}>
          <label>
            <input type="checkbox" /> Keep me logged in
          </label>
          <a href="/forgot-password" style={styles.link}>Forgot password?</a>
        </div>
        <button style={styles.loginBtn} onClick={handleLogin}>Login</button>

        {/* Signup redirect */}
        <p style={styles.signupText}>
          Don't have an account?
          <span
            style={styles.signupLink}
            onClick={() => navigate('/register')}
          >
            {' '}Create one
          </span>
        </p>
      </div>

      {/* Right side image */}
      <div style={styles.rightPanel}>
        <img
          src="https://img.freepik.com/premium-photo/smiling-male-doctor-with-stethoscope-standing-front-his-team_934652-26744.jpg"
          alt="Diabetes check"
          style={styles.rightImage}
        />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  leftPanel: {
    flex: 1,
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '120px',
    marginBottom: '20px',
    objectFit:'cover',
    borderRadius: '50%',
  },
  welcome: {
    fontSize: '26px',
    fontWeight: 'bold',
    marginBottom: '6px',
  },
  tagline: {
    color: '#666',
    marginBottom: '24px',
    fontSize: '14px',
  },
  socialContainer: {
    display: 'flex',
    gap: '12px',
    marginBottom: '16px',
  },
  socialBtn: {
    color: '#fff',
    padding: '10px 14px',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  icon: {
    fontWeight: 'bold',
    fontSize: '16px',
  },
  input: {
    width: '100%',
    maxWidth: '320px',
    padding: '12px',
    marginBottom: '12px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '14px'
  },
  options: {
    width: '100%',
    maxWidth: '320px',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
    marginBottom: '20px',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  loginBtn: {
    backgroundColor: '#6C63FF',
    color: 'white',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
    width: '100%',
    maxWidth: '320px',
    marginBottom: '16px',
  },
  signupText: {
    fontSize: '14px',
    color: '#444',
  },
  signupLink: {
    color: '#1e90ff',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  rightPanel: {
    flex: 1,
    backgroundColor: '#f9629f',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
};

export default Login;