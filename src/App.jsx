import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import IssuingAuthority from './components/IssuingAuthority';
import VerifyingAuthority from './components/VerifyingAuthority';
import Individual from './components/Individual';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/issuing" element={<IssuingAuthority />} />
          <Route path="/verifying" element={<VerifyingAuthority />} />
          <Route path="/individual" element={<Individual />} />
        </Routes>

        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/issuing">Issuing Authority</Link></li>
            <li><Link to="/verifying">Verifying Authority</Link></li>
            <li><Link to="/individual">Individual</Link></li>
          </ul>
        </nav>

      </div>
    </Router>
  );
}

export default App;