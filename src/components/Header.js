import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="logo">Insider<span>jobs</span></div>
      <div className="nav">
        <a href="#">Recruiter Login</a>
        <button className="register">Register</button>
      </div>
    </header>
  );
}

export default Header;
