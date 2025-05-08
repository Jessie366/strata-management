'use client';

import React, { useEffect, useState } from 'react';

type Repair = {
  id: number;
  name: string;
  unit: string;
  repair_description: string;
  submitted_at: string;
};

type Contact = {
  id: number;
  name: string;
  email: string;
  message_new: string;
  submitted_at: string;
};

export default function AdminPage() {
  const [repairs, setRepairs] = useState<Repair[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [repairsRes, contactsRes] = await Promise.all([
          fetch('https://php-backend-production.up.railway.app/api/get_repairs.php'),
          fetch('https://php-backend-production.up.railway.app/api/get_contacts.php'),
        ]);

        const repairsData = await repairsRes.json();
        const contactsData = await contactsRes.json();

        setRepairs(repairsData || []);
        setContacts(contactsData || []);
      } catch (err) {
        setError('Failed to fetch data.');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">Admin Dashboard</h1>

      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">🛠 Repair Requests</h2>
        <table className="w-full table-auto border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Unit</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {repairs.map((r) => (
              <tr key={`repair-${r.id}`} className="text-center">
                <td className="border p-2">{r.id}</td>
                <td className="border p-2">{r.name}</td>
                <td className="border p-2">{r.unit}</td>
                <td className="border p-2">{r.repair_description}</td>
                <td className="border p-2">{r.submitted_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">📬 Contact Messages</h2>
        <table className="w-full table-auto border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Message</th>
              <th className="p-2 border">Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={`contact-${c.id}`} className="text-center">
                <td className="border p-2">{c.id}</td>
                <td className="border p-2">{c.name}</td>
                <td className="border p-2">{c.email}</td>
                <td className="border p-2">{c.message_new}</td>
                <td className="border p-2">{c.submitted_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
