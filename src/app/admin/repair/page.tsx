'use client';

import React, { useEffect, useState } from 'react';

type Repair = {
  id: number;
  name: string;
  unit: string;
  description: string;
  submitted_at: string;
};

export default function RepairAdminPage() {
  const [repairs, setRepairs] = useState<Repair[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRepairs = async () => {
      try {
        const res = await fetch('https://php-backend-production.up.railway.app/get_repairs.php');
        if (!res.ok) throw new Error('Failed to fetch');

        const data: Repair[] = await res.json();
        setRepairs(data);
      } catch (err) {
        setError('Could not load repair data.');
        console.error(err);
      }
    };

    fetchRepairs();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow rounded-xl border">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">🔧 Repair Requests</h1>
      {error ? (
        <p className="text-red-600 text-center">{error}</p>
      ) : (
        <table className="w-full table-auto border-collapse border">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Unit</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {repairs.map((r) => (
              <tr key={r.id} className="text-center">
                <td className="border p-2">{r.id}</td>
                <td className="border p-2">{r.name}</td>
                <td className="border p-2">{r.unit}</td>
                <td className="border p-2">{r.description}</td>
                <td className="border p-2">{r.submitted_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
