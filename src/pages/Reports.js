
import { useEffect, useState } from 'react';

function Resources() {
  const [resources, setResources] = useState([]);

  const [newResource, setNewResource] = useState({
    type: '',
    allocatedTo: '',
    quantity: '',
    notes: ''
  });

  // Load resources from localStorage on first render
  useEffect(() => {
    const storedResources = JSON.parse(localStorage.getItem('resources')) || [];
    setResources(storedResources);
  }, []);

  // Save to localStorage whenever resources change
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

      // Optionally update recent activities for reports
      const activity = `Allocated ${newResource.quantity} ${newResource.type}(s) to ${newResource.allocatedTo}`;
      const activities = JSON.parse(localStorage.getItem('recentActivities')) || [];
      activities.unshift(activity);
      localStorage.setItem('recentActivities', JSON.stringify(activities));

      setNewResource({ type: '', allocatedTo: '', quantity: '', notes: '' });
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
