import React, { useState, useEffect } from "react";

function Citizens() {
  const [citizens, setCitizens] = useState([]);
  const [form, setForm] = useState({ name: "", age: "", place: "", gender: "", occupation: "" });

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("citizens");
    if (stored) setCitizens(JSON.parse(stored));
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("citizens", JSON.stringify(citizens));
  }, [citizens]);

  const handleAdd = () => {
    if (form.name) {
      setCitizens([...citizens, form]);
      setForm({ name: "", age: "", place: "", gender: "", occupation: "" });
    }
  };

  return (
    <div>
      <h2>Citizen Management</h2>
      {/* Form Inputs */}
      <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Name" />
      <input value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} placeholder="Age" />
      <input value={form.place} onChange={e => setForm({ ...form, place: e.target.value })} placeholder="Place" />
      <input value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })} placeholder="Gender" />
      <input value={form.occupation} onChange={e => setForm({ ...form, occupation: e.target.value })} placeholder="Occupation" />
      <button onClick={handleAdd}>Add Citizen</button>

      {/* List Display */}
      <ul>
        {citizens.map((c, i) => (
          <li key={i}>
            {c.name}, {c.age}, {c.place}, {c.gender}, {c.occupation}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Citizens;
