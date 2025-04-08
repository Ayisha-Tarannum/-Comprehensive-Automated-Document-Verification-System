import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import IssuingAuthority from './components/IssuingAuthority';
import VerifyingAuthority from './components/VerifyingAuthority';
import Individual from './components/Individual';

function AppContent() {
  const location = useLocation();

  // Routes where the navigation bar should be hidden
  const hideNavRoutes = ['/','/issuing', '/verifying', '/individual'];
  const hideNav = hideNavRoutes.includes(location.pathname);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/issuing" element={<IssuingAuthority />} />
        <Route path="/verifying" element={<VerifyingAuthority />} />
        <Route path="/individual" element={<Individual />} />
      </Routes>

      {!hideNav && (
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/issuing">Issuing Authority</Link></li>
            <li><Link to="/verifying">Verifying Authority</Link></li>
            <li><Link to="/individual">Individual</Link></li>
          </ul>
        </nav>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
