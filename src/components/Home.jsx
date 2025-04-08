// Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Assuming you split CSS for Home

function Home() {
  return (
    <div className="home-container">
      <h1>Automated Document Verification System</h1>
      <p>
        Welcome to the comprehensive portal for generating, verifying, and accessing essential documents for official purposes.
      </p>

      <div className="button-container">
        <ul className="nav-buttons">
          <li><Link to="/issuing">Issuing Authority</Link></li>
          <li><Link to="/verifying">Verifying Authority</Link></li>
          <li><Link to="/individual">Individual</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
