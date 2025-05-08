// src/app/repair/page.js
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RepairRequest() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');
  const [description, setDescription] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('https://php-backend-production.up.railway.app/repair.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, unit, description }),
    });

    const data = await response.json();
    if (data.error) {
      setResponseMessage(`Error: ${data.error}`);
    } else {
      router.push('/thank-you'); // ✅ Redirect on success
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white border border-gray-300 rounded-xl shadow-md">
      <h1 className="text-3xl font-semibold text-blue-800 mb-6 text-center">Submit a Repair Request</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg font-medium mb-2">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-lg font-medium mb-2">Unit Number</label>
          <input
            type="text"
            placeholder="Enter your unit number"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-lg font-medium mb-2">Repair Description</label>
          <textarea
            placeholder="Describe the repair issue..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={6}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        >
          Submit
        </button>
      </form>

      {responseMessage && (
        <p className={`mt-4 text-lg ${responseMessage.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
          {responseMessage}
        </p>
      )}
    </div>
  );
}
