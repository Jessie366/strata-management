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
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://php-backend-production.up.railway.app';
    const response = await fetch(`${backendUrl.replace(/\/$/, '')}/repair.php`, {
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
      router.push('/thank-you');
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">Maintenance</p>
      <h1 className="mt-2 text-3xl font-semibold text-slate-950">Submit a repair request</h1>
      <p className="mt-3 text-slate-600">Tell the management team what needs attention and where it is located.</p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-300 p-3 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Unit number</label>
          <input
            type="text"
            placeholder="Enter your unit number"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-300 p-3 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Repair description</label>
          <textarea
            placeholder="Describe the repair issue..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-300 p-3 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
            rows={6}
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-slate-950 py-3 font-semibold text-white transition hover:bg-slate-800"
        >
          Submit
        </button>
      </form>

      {responseMessage && (
        <p className={`mt-4 rounded-xl px-4 py-3 text-sm font-medium ${responseMessage.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'}`}>
          {responseMessage}
        </p>
      )}
      </div>
    </div>
  );
}
