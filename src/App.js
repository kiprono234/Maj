
// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Citizens from './pages/Citizens';
import Login from './pages/Login';
import Projects from './pages/Projects';
import Resources from './pages/Resources';
import Reports from './pages/Reports';
import MasterEntry from './pages/MasterEntry';
import Dashboard from './pages/Dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });

  const handleLoginSuccess = () => {
    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLogin={handleLoginSuccess} />
        } />
        <Route path="/dashboard" element={
          isAuthenticated ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/" />
        } />
        <Route path="/citizens" element={
          isAuthenticated ? <Citizens /> : <Navigate to="/" />
        } />
        <Route path="/projects" element={
          isAuthenticated ? <Projects /> : <Navigate to="/" />
        } />
        <Route path="/resources" element={
          isAuthenticated ? <Resources /> : <Navigate to="/" />
        } />
        <Route path="/reports" element={
          isAuthenticated ? <Reports /> : <Navigate to="/" />
        } />
        <Route path="/master-entry" element={
          isAuthenticated ? <MasterEntry /> : <Navigate to="/" />
        } />
      </Routes>
    </Router>
  );
}

export default App;
