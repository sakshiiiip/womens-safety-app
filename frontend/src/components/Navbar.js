import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo">
          SafetyShield
        </NavLink>
        <nav className="nav-menu">
          <NavLink to="/" className="nav-item" activeClassName="active" exact>
            Home
          </NavLink>
          <NavLink to="/safety-tips" className="nav-item" activeClassName="active">
            Safety Tips
          </NavLink>
          <NavLink to="/about" className="nav-item" activeClassName="active">
            About
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;