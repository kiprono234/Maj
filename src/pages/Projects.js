
import React, { useEffect, useState } from 'react';

function Reports() {
  const [reportData, setReportData] = useState({
    totalCitizens: 0,
    totalProjects: 0,
    totalResources: 0,
    recentActivities: []
  });

  // Load real-time data from localStorage
  useEffect(() => {
    const citizens = JSON.parse(localStorage.getItem('citizens')) || [];
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    const resources = JSON.parse(localStorage.getItem('resources')) || [];
    const activities = JSON.parse(localStorage.getItem('recentActivities')) || [];

    const data = {
      totalCitizens: citizens.length,
      totalProjects: projects.length,
      totalResources: resources.length,
      recentActivities: activities.length > 0 ? activities : [
        'Added new citizen: Jane Doe',
        'Allocated 100 water tanks to Ward 4',
        'Updated road project progress in Ward 2'
      ]
    };

    setReportData(data);
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Reports & Insights</h2>

      {/* Summary Stats */}
      <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
        <div style={cardStyle}>
          <h3>Total Citizens</h3>
          <p>{reportData.totalCitizens}</p>
        </div>
        <div style={cardStyle}>
          <h3>Total Projects</h3>
          <p>{reportData.totalProjects}</p>
        </div>
        <div style={cardStyle}>
          <h3>Total Resources</h3>
          <p>{reportData.totalResources}</p>
        </div>
      </div>

      {/* Recent Activities */}
      <div>
        <h3>Recent Activity</h3>
        <ul>
          {reportData.recentActivities.map((activity, index) => (
            <li key={index}>✅ {activity}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const cardStyle = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '1rem',
  width: '200px',
  textAlign: 'center',
  backgroundColor: '#f9f9f9'
};

export default Reports;
