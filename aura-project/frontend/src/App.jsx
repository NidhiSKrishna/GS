import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Detect from './pages/Detect';
import HowItWorks from './pages/HowItWorks';
import IdentityVault from './pages/IdentityVault';
import RiskMonitor from './pages/RiskMonitor';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState({ name: 'Guest User', email: 'guest@aidetection.com' });

  return (
    <Router>
      <div className="app-container font-heading">
        {/* Top Navigation Bar */}
        <header className="topbar">
          <div className="logo-section">
            <div className="shield-icon">
              <i className="fa-solid fa-shield-halved"></i>
            </div>
            <div className="brand">
              <h1>DIGITAL IDENTITY SHIELD</h1>
              <span className="subtitle">ANTIVIRUS FOR YOUR FACE</span>
            </div>
          </div>
          


          <div className="header-actions">
            <button className="icon-btn active-alert"><i className="fa-regular fa-bell"></i></button>
            <button className="icon-btn" title="User Profile">
              <i className="fa-regular fa-user"></i>
            </button>
            <button className="icon-btn"><i className="fa-solid fa-gear"></i></button>
          </div>
        </header>

        {/* Main Navigation Tabs */}
        <nav className="main-nav">
          <NavLink 
            to="/" 
            className={({ isActive }) => (isActive ? "nav-tab active" : "nav-tab")}
          >
            HOW IT WORKS
          </NavLink>
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => (isActive ? "nav-tab active" : "nav-tab")}
          >
            DETECT
          </NavLink>
          <NavLink 
            to="/vault" 
            className={({ isActive }) => (isActive ? "nav-tab active" : "nav-tab")}
          >
            IDENTITY VAULT
          </NavLink>
          <NavLink 
            to="/detect" 
            className={({ isActive }) => (isActive ? "nav-tab active" : "nav-tab")}
          >
            TRACK
          </NavLink>
          <NavLink 
            to="/risk" 
            className={({ isActive }) => (isActive ? "nav-tab active" : "nav-tab")}
          >
            RISK MONITOR
          </NavLink>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HowItWorks />} />
          <Route path="/dashboard" element={<Dashboard currentUser={currentUser} />} />
          <Route path="/detect" element={<Detect currentUser={currentUser} />} />
          <Route path="/vault" element={<IdentityVault currentUser={currentUser} />} />
          <Route path="/risk" element={<RiskMonitor currentUser={currentUser} />} />
          
          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        

      </div>
    </Router>
  );
}

export default App;
