'use client';

import React, { useEffect, useState } from 'react';

type Contact = {
  id: number;
  name: string;
  email: string;
  message_new: string;
  submitted_at: string;
};

export default function AdminPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch('https://php-backend-production.up.railway.app/get_contacts.php');
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setContacts(data.contacts);
      } catch (err: any) {
        setError('Could not load contact data.');
        console.error('Error fetching contacts:', err);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white border border-gray-300 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">Admin Panel - Contact Messages</h1>
      {error ? (
        <p className="text-red-600 text-center">{error}</p>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Message</th>
              <th className="border p-2">Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c.id} className="text-center">
                <td className="border p-2">{c.id}</td>
                <td className="border p-2">{c.name}</td>
                <td className="border p-2">{c.email}</td>
                <td className="border p-2">{c.message_new}</td>
                <td className="border p-2">{c.submitted_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
