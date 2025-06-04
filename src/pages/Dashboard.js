
// src/pages/Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard({ onLogout }) {
  const navigate = useNavigate();

  return (
    <div className="dashboard" style={{ padding: "2rem" }}>
      <h2>Welcome to Majimbo Data Management System</h2>
      <div className="button-group">
        <button onClick={() => navigate("/citizens")}>Citizens</button>
        <button onClick={() => navigate("/projects")}>Projects</button>
        <button onClick={() => navigate("/resources")}>Resources</button>
        <button onClick={() => navigate("/reports")}>Reports</button>
        <button onClick={() => navigate("/master-entry")}>Master Entry</button>
      </div>
      <br />
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
