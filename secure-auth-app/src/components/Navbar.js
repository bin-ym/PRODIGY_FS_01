// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // You can create a CSS file for Navbar styles if needed

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          MyApp
        </Link>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">
              Home
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/login" className="navbar-link">
              Login
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
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
