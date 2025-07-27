import React, { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const PasswordInput = ({ value, onChange, style }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '320px', marginBottom: '12px' }}>
  <input
    type={showPassword ? 'text' : 'password'}
    placeholder="Enter your password"
    value={value}
    onChange={onChange}
    style={{
      width: '100%',
      padding: '12px',
      paddingRight: '40px',
      border: '1px solid #ccc',
      borderRadius: '6px',
      fontSize: '14px',
      ...style
    }}
  />
  <span
    onClick={() => setShowPassword(!showPassword)}
    style={{
      position: 'absolute',
      right: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
      fontSize: '18px',
      color: '#555'
    }}
  >
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </span>
</div>

  );
};

export default PasswordInput;
