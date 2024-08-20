// src/components/DashboardNavbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Reuse the same CSS from Navbar for consistency

function DashboardNavbar({ handleLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-logo">
          MyApp
        </Link>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/dashboard" className="navbar-link">
              Home
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/about" className="navbar-link">
              About Us
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/contact" className="navbar-link">
              Contact Us
            </Link>
          </li>
          <li className="navbar-item">
            <button onClick={handleLogout} className="navbar-link logout-button">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default DashboardNavbar;
