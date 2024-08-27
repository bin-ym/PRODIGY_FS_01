// src/components/Logout.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Logout({ handleLogout }) {
  const navigate = useNavigate();

  const onLogout = () => {
    // Clear token or any session data
    handleLogout();

    // Redirect to the root page after logout
    navigate('/'); // Redirects to http://localhost:3000/
  };

  return (
    <button onClick={onLogout}>
      Logout
    </button>
  );
}

export default Logout;