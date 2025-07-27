import React, { useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const EmailPage = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/forgot-password', { email });
      
      setMessage(response.data.msg);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error(error);
      setMessage('Error sending email');
    }
  };

  return (
    <div className='container' style={{ backgroundColor:'#064b9bff', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '10vh', minWidth: '50vw',marginTop:'30px' }}>
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      
      {message && <h5 style={{ color: 'white', }}>{message}</h5>}
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
        />
        <button type="submit" style={{ padding: '10px', width: '100%' }}>
          Send Reset Link
        </button>
      </form>
    </div>
    </div>
  );
};

export default EmailPage;

