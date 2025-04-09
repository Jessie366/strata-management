import React, { useState } from 'react';

export default function RepairRequest() {
  const [repairDescription, setRepairDescription] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/edge-functions/submit-repair', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ repairDescription }),
    });

    const data = await response.json();
    if (data.error) {
      setResponseMessage(`Error: ${data.error}`);
    } else {
      setResponseMessage(`Success: ${data.message} (ID: ${data.repairRequest.id})`);
    }
  };

  return (
    <div>
      <h1>Submit a Repair Request</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Describe the repair issue..."
          value={repairDescription}
          onChange={(e) => setRepairDescription(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}
