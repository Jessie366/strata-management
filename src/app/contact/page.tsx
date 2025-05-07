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
      const res = await fetch('https://php-backend-production.up.railway.app/api/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();
      console.log(data);

      if (data.error) {
        setResponseMessage(`❌ Error: ${data.error}`);
      } else {
        setResponseMessage(`✅ Message sent successfully! ID: ${data.id}`);
      }
    } catch (error) {
      setResponseMessage('❌ Submission failed. Please try again later.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 border border-gray-300 rounded-xl shadow-lg bg-white">
      <h1 className="text-3xl font-semibold text-blue-800 mb-6 text-center">Contact Us</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            required
            className="w-full border rounded-lg px-4 py-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            required
            className="w-full border rounded-lg px-4 py-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium">Message</label>
          <textarea
            required
            rows={6}
            className="w-full border rounded-lg px-4 py-3"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg">
          Submit
        </button>

        {responseMessage && (
          <p className={`mt-4 text-lg ${responseMessage.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
            {responseMessage}
          </p>
        )}
      </form>
    </div>
  );
}
