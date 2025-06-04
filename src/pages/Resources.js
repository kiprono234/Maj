
// src/pages/Resources.js

import { useState, useEffect } from 'react';

function Resources() {
  const [resources, setResources] = useState([]);

  const [newResource, setNewResource] = useState({
    type: '',
    allocatedTo: '',
    quantity: '',
    notes: ''
  });

  // Load resources from localStorage on mount
  useEffect(() => {
    const storedResources = localStorage.getItem('resources');
    if (storedResources) {
      setResources(JSON.parse(storedResources));
    }
  }, []);

  // Save resources to localStorage on change
  useEffect(() => {
    localStorage.setItem('resources', JSON.stringify(resources));
  }, [resources]);

  const handleChange = (e) => {
    setNewResource({ ...newResource, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newResource.type && newResource.allocatedTo && newResource.quantity) {
      const updatedResources = [...resources, newResource];
      setResources(updatedResources);
      setNewResource({ type: '', allocatedTo: '', quantity: '', notes: '' });

      // Update activity log for reports
      const activity = `Added resource: ${newResource.type} allocated to ${newResource.allocatedTo}`;
      const activityLog = JSON.parse(localStorage.getItem('recentActivities')) || [];
      activityLog.unshift(activity);
      localStorage.setItem('recentActivities', JSON.stringify(activityLog));

      // Update reportData counts
      const currentReportData = JSON.parse(localStorage.getItem('reportData')) || {};
      const updatedReportData = {
        ...currentReportData,
        totalResources: (currentReportData.totalResources || 0) + 1,
        recentActivities: [activity, ...(currentReportData.recentActivities || [])].slice(0, 10)
      };
      localStorage.setItem('reportData', JSON.stringify(updatedReportData));
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Resource Allocation</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <h3>Add Resource</h3>
        <div>
          <label>Type:</label>
          <input
            type="text"
            name="type"
            value={newResource.type}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Allocated To:</label>
          <input
            type="text"
            name="allocatedTo"
            value={newResource.allocatedTo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={newResource.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Notes:</label>
          <textarea
            name="notes"
            value={newResource.notes}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add Resource</button>
      </form>

      <h3>Resource List</h3>
      <ul>
        {resources.map((res, index) => (
          <li key={index}>
            <strong>{res.type}</strong> - {res.quantity} units allocated to <em>{res.allocatedTo}</em><br />
            {res.notes && <small>Notes: {res.notes}</small>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Resources;
