import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="error-code">404</div>
        <h1 className="error-title">Nothingness Found</h1>
        <p className="error-message">
          The page you seek has dissolved into the void. 
          Like all things, it was temporary.
        </p>
        <div className="navigation-links">
          <Link to="/" className="home-link">Return to Existence</Link>
          <Link to="/admin" className="admin-link">Seek Control</Link>
        </div>
        <div className="philosophy-quote">
          "In the midst of nothing, we find everything."
        </div>
      </div>
    </div>
  );
};

export default NotFound;