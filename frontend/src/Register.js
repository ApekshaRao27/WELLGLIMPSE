import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Register = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retype, setRetype] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!name.trim()) errs.name = 'Name is required';
    if (!(+age >= 1 && +age <= 120)) errs.age = 'Enter a valid age';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Invalid email';
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}/.test(password)) {
      errs.password = 'Min 8 chars, upper, lower & special';
    }
    if (password !== retype) errs.retype = 'Passwords do not match';
    return errs;
  };

const handleRegister = async (e) => {
  e.preventDefault();
  const errs = validate();
  if (Object.keys(errs).length === 0) {
    try {
      const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const res = await axios.post(`${BASE_URL}/api/auth/register`, {
        name,
        age,
        email,
        password
      });

      setMessage("Registration successful");
      localStorage.setItem('name', name);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed');
    }
  } else setErrors(errs);
};


  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Create Account</h2>
        {message && <p style={{ color: 'green', fontSize: '14px', marginTop: '8px' }}>{message}</p>}
        <form name="formData" id="formData" style={styles.form} onSubmit={handleRegister}>
          <input type="text" placeholder="Name" style={styles.input} value={name} onChange={e=>setName(e.target.value)} />
          {errors.name && <p style={styles.error}>{errors.name}</p>}
          <input type="number" placeholder="Age" style={styles.input} value={age} onChange={e=>setAge(e.target.value)} />
          {errors.age && <p style={styles.error}>{errors.age}</p>}
          <input type="email" placeholder="Email" style={styles.input} value={email} onChange={e=>setEmail(e.target.value)} />
          {errors.email && <p style={styles.error}>{errors.email}</p>}
          <input type="password" placeholder="Password" style={styles.input} value={password} onChange={e=>setPassword(e.target.value)} />
          {errors.password && <p style={styles.error}>{errors.password}</p>}
          <input type="password" placeholder="Retype Password" style={styles.input} value={retype} onChange={e=>setRetype(e.target.value)} />
          {errors.retype && <p style={styles.error}>{errors.retype}</p>}
          <button type="submit" style={styles.registerBtn}>Register Now</button>
        </form>
        <p style={styles.bottom}>
          Already have an account?{' '}
          <span style={styles.loginLink} onClick={() => navigate('/')}>Login here</span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor:'dark',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Arial, sans-serif',
    padding:"20px"
  },
  card: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '20px',
    width: '90vw',
    maxWidth:"380px",
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginTop: '24px',
  },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '16px',
     width: '100%',            
  maxWidth: '100%',   
  },
  registerBtn: {
    marginTop: '16px',
    padding: '14px',
    backgroundColor: '#5a4ce6',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  bottom: {
    marginTop: '20px',
    fontSize: '14px',
    textAlign: 'center',
  },
  loginLink: {
    color: '#5a4ce6',
    cursor: 'pointer',
  },
  error: {
    fontSize: '12px',
    color: 'red',
    marginBottom: '-8px',
  }
};

export default Register;