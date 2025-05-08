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
  
        // 🔒 明确声明类型：数组中每一项是 unknown，但你再安全地访问字段
        const rawData: unknown = await res.json();
  
        if (!Array.isArray(rawData)) {
          throw new Error('Unexpected data format');
        }
  
        const data: Repair[] = rawData.map((item) => {
          const record = item as {
            id: number;
            name: string;
            unit: string;
            repair_description: string;
            submitted_at: string;
          };
          return {
            id: record.id,
            name: record.name,
            unit: record.unit,
            description: record.repair_description,
            submitted_at: record.submitted_at,
          };
        });
  
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
