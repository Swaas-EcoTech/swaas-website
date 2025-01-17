import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './navbar.css';
import Team from '../Team/Team';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <img 
            src="/images/logo-swaas.jpg"
            alt="Logo"
          />
        </div>

        {/* Hamburger Icon */}
        <div className="hamburger" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <li>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
              About
            </Link>
          </li>
          <li>
            <Link to="/events" className={location.pathname === '/events' ? 'active' : ''}>
              Events
            </Link>
          </li>
          <li>
            <Link to="/Team" className={location.pathname === '/Team' ? 'active' : ''}>
              Team
            </Link>
          </li>
          <li>
            <Link to="/gallery" className={location.pathname === '/gallery' ? 'active' : ''}>
              Gallery
            </Link>
          </li>
          <li>
            <Link to="/collabs" className={location.pathname === '/collabs' ? 'active' : ''}>
              Collabs
            </Link>
          </li>
        </ul>
      </nav>
      <div className="navbar-line"></div>
    </>
  );
}

export default Navbar;
