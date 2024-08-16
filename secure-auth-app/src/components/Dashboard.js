import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div>
      <nav style={styles.navbar}>
        <ul style={styles.navList}>
          <li style={styles.navItem}>
            <a href="/dashboard" style={styles.navLink}>Dashboard</a>
          </li>
          <li style={styles.navItem}>
            <button onClick={handleLogout} style={styles.navLink}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
      <div style={styles.container}>
        <h2>Dashboard</h2>
        <p>Welcome to the protected dashboard!</p>
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    backgroundColor: '#333',
    padding: '10px',
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    margin: 0,
    padding: 0,
  },
  navItem: {
    margin: '0 10px',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
  },
  container: {
    padding: '20px',
  },
};

export default Dashboard;
