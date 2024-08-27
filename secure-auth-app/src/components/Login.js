import React, { useState } from 'react';
import PasswordInput from './PasswordInput';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css'; // Import the CSS file for styling

function Login({ handleLogin }) {
  const [identifier, setIdentifier] = useState(''); // Username or email
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State for error messages
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { identifier, password });
      localStorage.setItem('token', response.data.token);
      
      handleLogin(); // Update App state to mark user as authenticated
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      if (error.response?.data?.message) {
        if (error.response.data.message === 'Invalid credentials') {
          setError('Invalid username or password'); // Specific error message
        } else {
          setError('An error occurred. Please try again.');
        }
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <div className="error-alert">{error}</div>} {/* Display error */}
      <form onSubmit={handleLoginSubmit} className="auth-form">
        <input
          type="text"
          placeholder="Username or Email"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
        />
        <PasswordInput
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default Login;
