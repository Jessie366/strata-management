// src/app/contact/page.tsx

'use client';

import React, { useState } from 'react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'https://php-backend-production.up.railway.app';
      const res = await fetch(`${backendUrl.replace(/\/$/, '')}/contact.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();
      console.log(data);

      if (data.error) {
        setResponseMessage(`Error: ${data.error}`);
      } else {
        setResponseMessage(`Message sent successfully. Reference ID: ${data.id}`);
      }
    } catch (error) {
      setResponseMessage('Submission failed. Please try again later.');
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">Contact</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-950">Send a message to strata management</h1>
        <p className="mt-3 text-slate-600">Use this form for general questions, document requests, and resident support.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700">Name</label>
          <input
            type="text"
            required
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Email</label>
          <input
            type="email"
            required
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Message</label>
          <textarea
            required
            rows={6}
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <button type="submit" className="w-full rounded-xl bg-slate-950 py-3 font-semibold text-white transition hover:bg-slate-800">
          Submit
        </button>

        {responseMessage && (
          <p className={`rounded-xl px-4 py-3 text-sm font-medium ${responseMessage.includes('Error') || responseMessage.includes('failed') ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'}`}>
            {responseMessage}
          </p>
        )}
      </form>
      </div>
    </div>
  );
}
