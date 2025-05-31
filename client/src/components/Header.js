import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="logo-circle">
        <img src="/logo.png" alt="Logo" className="logo-img" />
      </div>
      <h1 className="title">Digital Signature Creator</h1>
    </header>
  );
}

export default Header;

