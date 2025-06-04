
// src/pages/MasterEntry.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MasterEntry() {
  const [entry, setEntry] = useState({
    citizenName: '',
    citizenWard: '',
    projectName: '',
    projectWard: '',
    projectStatus: '',
    resourceType: '',
    resourceQuantity: '',
    resourceAllocatedTo: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setEntry({ ...entry, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save Citizen
    const citizens = JSON.parse(localStorage.getItem('citizens')) || [];
    citizens.push({ name: entry.citizenName, ward: entry.citizenWard });
    localStorage.setItem('citizens', JSON.stringify(citizens));

    // Save Project
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    projects.push({ name: entry.projectName, ward: entry.projectWard, status: entry.projectStatus });
    localStorage.setItem('projects', JSON.stringify(projects));

    // Save Resource
    const resources = JSON.parse(localStorage.getItem('resources')) || [];
    resources.push({ type: entry.resourceType, quantity: entry.resourceQuantity, allocatedTo: entry.resourceAllocatedTo });
    localStorage.setItem('resources', JSON.stringify(resources));

    // Update reports activities
    const report = JSON.parse(localStorage.getItem('reportData')) || { recentActivities: [] };
    const activities = [
      `Added citizen: ${entry.citizenName}`,
      `Added project: ${entry.projectName}`,
      `Allocated ${entry.resourceQuantity} ${entry.resourceType} to ${entry.resourceAllocatedTo}`
    ];
    report.recentActivities = [...activities, ...report.recentActivities].slice(0, 10); // keep latest 10
    localStorage.setItem('reportData', JSON.stringify(report));

    alert('All data saved!');
    navigate('/dashboard'); // or any page you want to return to
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Master Entry Form</h2>
      <form onSubmit={handleSubmit}>
        <h3>Citizen Info</h3>
        <input name="citizenName" placeholder="Citizen Name" onChange={handleChange} required />
        <input name="citizenWard" placeholder="Citizen Ward" onChange={handleChange} required />

        <h3>Project Info</h3>
        <input name="projectName" placeholder="Project Name" onChange={handleChange} required />
        <input name="projectWard" placeholder="Project Ward" onChange={handleChange} required />
        <input name="projectStatus" placeholder="Project Status" onChange={handleChange} required />

        <h3>Resource Info</h3>
        <input name="resourceType" placeholder="Resource Type" onChange={handleChange} required />
        <input name="resourceQuantity" type="number" placeholder="Quantity" onChange={handleChange} required />
        <input name="resourceAllocatedTo" placeholder="Allocated To" onChange={handleChange} required />

        <button type="submit" style={{ marginTop: '1rem' }}>Submit All</button>
      </form>
    </div>
  );
}

export default MasterEntry;
