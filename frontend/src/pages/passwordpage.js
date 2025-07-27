import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPasswordPage = () => {
  const { token } = useParams(); // get token from URL
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/reset-password/${token}`, { newPassword });
      setMessage(res.data.msg);
      setTimeout(() => {
        navigate('/'); // redirect to login after success
      }, 3000);
      navigate('/'); // redirect to login after success
    } catch (error) {
      console.error(error);
      setMessage('Invalid or expired token');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      {message && <h5 style={{ color: 'white' }}>{message}</h5>}
      <h2>Enter New Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New password"
          required
          style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
        />
        <button type="submit" style={{ padding: '10px', width: '100%' }}>
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
